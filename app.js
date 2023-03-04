const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
var bodyParser = require('body-parser')
const { check, body, validationResult } = require('express-validator');
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const { response } = require("express");


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wgsa_company'
});

// express app
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');

app.use(express.static('public'));

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('my sql connected');
});


// listen for requests
app.listen(3000, () => {
    console.log('server started on port 3000');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/FAQS', (req, res) => {
    const myquery1 = "SELECT Question_code, Question, Answer, Fname,Lname from wgsa_company.FAQs , wgsa_company.employee where Answered_by=Ssn";
    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        res.render('FAQS', { result })
    });
});
app.get('/Login', (req, res) => {
    res.render('Login', { errmessage: '', successMes: '' })
});

app.get('/Recharge', (req, res) => {
    res.render('Recharge')
});

app.get('/DataEmployee', (req, res) => {
    res.render('DataEmployee', { successMes: '', errmessage: '' })
});
app.get('/HR', (req, res) => {
    res.render('HR', { successMes: '', errmessage: '' })
});
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/CustomerService', (req, res) => {

    let query = `select Fname,Lname from wgsa_company.employee where SSn=${895623}`;
    let query2 = `select plan_name,plan_code from wgsa_company.plan `;

    db.query(query, (err, emp) => {
        if (err) {
            console.log(err)
        }

        db.query(query2, (err, plans) => {
            if (err) {
                console.log(err)
                return res.render('404', { err });
            }
            res.render('CustomerService', { plans, result: '', errmessage: '', successMes: '' })
        });

    });
});



app.post('/getCustomerinfo', urlencodedParser, (req, res) => {

    const user_number = req.body.Phone_number;

    const myquery1 = `Select * from wgsa_company.customer
    where customer.Phone_num=${user_number}`;

    db.query(myquery1, (err, result, field) => {
        if (err) {
            console.log(err);
            throw err;
        }

        if (result[0].Renewal_date) {
            result[0].Renewal_date = result[0].Renewal_date.toString().substr(0, 15);
        }

        let query2 = `select * from wgsa_company.plan `;
        db.query(query2, (err, plans) => {
            if (err) {
                console.log(err)
                return res.render('404', { err });
            }
            console.log(plans);
            console.log(result);
            if (result[0].Gender) {
                if (result[0].Gender == 'M')
                    result[0].Gender = 'Male';
                else
                    result[0].Gender = 'Female';
            }
            res.render('CustomerService', { result, plans, errmessage: '', successMes: 'Done' })


        });

    });



});
app.post('/ViewCustomerData', urlencodedParser, (req, res) => {

    var user_number = req.body.Phone_number;

    let myquery1 = `Select * from wgsa_company.customer as c ,wgsa_company.plan as p   
    where c.plan_code=p.plan_code AND c.Phone_num=${user_number}`;

    db.query(myquery1, (err, result, field) => {
        if (err) {
            console.log(err);
            res.render('404', { err });
        }

        if (result[0].Gender) {
            if (result[0].Gender == 'M')
                result[0].Gender = 'Male';
            else
                result[0].Gender = 'Female';
        }
        console.log(result);
        res.render('TechnicalSupport', { result, successMes: 'Done', errmessage: '' })

    });

});


app.get('/Offers', (req, res) => {

    let myquery1 = "SELECT Launch_date, Price, Minutes, Expire_date, Megas, Offer_describ, Offer_num from wgsa_company.Offer";
    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        res.render('Offers', { result })
    });

});
app.get('/plans', (req, res) => {

    let myquery1 = "SELECT * from wgsa_company.plan";
    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        res.render('plans', { result })
    });

});
app.get('/Register', (req, res) => {

    res.render('Register', { errmessage: '', successMes: '' })
});

app.get('/Customer', (req, res) => {

    var user_number = us;

    let myquery1 = `Select customer.Balance, customer.Renewal_date, customer.Gender ,customer.Fname,customer.Lname, plan.Plan_name,customer.Used_megas,customer.Used_min
    from wgsa_company.plan,wgsa_company.customer
    where customer.plan_code=plan.Plan_code and customer.Phone_num=${user_number}`;

    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        if (result.length > 0) {
            result[0].Renewal_date = result[0].Renewal_date.toString().substr(0, 15);
            console.log(result);
            res.render('Customer', { result })
        }
    });

});

app.post('/Update_Plan_Cost', urlencodedParser, function (req, res) {

    var Plannewprice = req.body.Plan_New_Price;
    var plancode = req.body.Plan_Code;
    let myquery = `UPDATE wgsa_company.Plan  SET Plan.Price= ${Plannewprice}  where Plan.Plan_code=${plancode}`;

    db.query(myquery, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('DataEmployee', { result, successMes: 'Done', errmessage: '' });
    });

});
app.post('/Delete_Plan', urlencodedParser, function (req, res) {

    var Plan_code = req.body.Plan_Code;

    let myquery = `delete FROM wgsa_company.PLAN WHERE PLAN.PLAN_CODE =${Plan_code}`;

    db.query(myquery, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('DataEmployee', { result, successMes: 'Done', errmessage: '' });
    });

});


app.post('/Remove_customer', urlencodedParser, function (req, res) {

    var phone_num = parseInt(req.body.Phone_num, 10);

    function CheckNumbersEntered123() {
        if (phone_num <= 0) {
            return res.render('HR', { errmessage: 'Enter valid number please', successMes: '' });
        }
        else {
            CheckCustomer123();
        }

    }

    function CheckCustomer123() {

        let query123 = `select *
        from wgsa_company.customer
        where customer.phone_num=${phone_num}; `;

        db.query(query123, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length === 0) {
                console.log("There is no customer with that phone number");
                return res.render('HR', { errmessage: 'There is no customer with that phone number', successMes: '' });
            }
            else {
                ExecuteDeleteCustomer();
            }

        });
    }

    function ExecuteDeleteCustomer() {

        let myquery = `delete FROM wgsa_company.customer WHERE customer.Phone_num =${phone_num}`;
        db.query(myquery, (err, result, field) => {
            if (err) {
                console.log(err)
                res.render('404', { err });
            }
            console.log(result);
            res.render('HR', { successMes: 'Done', errmessage: '' });
        });

    }

    CheckNumbersEntered123();

});

app.post('/Remove_employee', urlencodedParser, function (req, res) {

    var ssn = parseInt(req.body.SSN, 10);

    function CheckssnEntered1233() {


        if (ssn <= 0) {
            return res.render('HR', { errmessage: 'Enter valid ssn please', successMes: '' });
        }
        else {
            checkssnifexistbefore();
        }

    }

    function checkssnifexistbefore() {
        let query123 = `select *
    from wgsa_company.employee
    where employee.ssn=${ssn};`;

        db.query(query123, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length === 0) {
                console.log("There is no Employee with that ssn");
                return res.render('HR', { errmessage: 'There is no Employee with that ssn', successMes: '' });
            }
            else {
                ExecuteDeleteforEmployee();
            }

        });


    }

    function ExecuteDeleteforEmployee() {
        let myquery = `delete FROM wgsa_company.EMPLOYEE WHERE EMPLOYEE.SSN =${ssn}`;
        db.query(myquery, (err, result, field) => {
            if (err) {
                console.log(err)
                res.render('404', { err });
            }
            console.log(result);
            res.render('HR', { successMes: `The employee with SSN ${ssn} is deleted successfully`, errmessage: '' });
        });
    }

    CheckssnEntered1233();

});


app.post('/Add_New_Plan', urlencodedParser, function (req, res) {

    var Plan_name = req.body.Plan_name;
    var Plan_code = req.body.Plan_code;
    var Minutes = req.body.Minutes;
    var Megas = req.body.Megas;
    var Price = req.body.Price;

    if (!Minutes)
        Minutes = "NULL";

    if (!Megas)
        Megas = "NULL";

    let myquery = `Insert into wgsa_company.plan (Plan_code, Price, Minutes, Megas, Plan_name) values (${Plan_code},${Price},${Minutes},${Megas},"${Plan_name.toString()}")`;


    db.query(myquery, (err, result, field) => {
        if (err) res.render('404', { err });
        else {
            console.log(result);
            res.render('DataEmployee', { successMes: 'Done', errmessage: '' });
        }
    });

});
var us;
app.post('/Recharge_Process', urlencodedParser, function (req, res) {
    var Card_Serial_Num = req.body.Card_Serial_Num;
    var user_number = us;
    let myquery = `Update wgsa_company.customer
    set customer.balance=customer.balance+ (select Card_value
                                                    from wgsa_company.card
                                                    where card.Serial_number=${Card_Serial_Num})
    where customer.Phone_num=${user_number}`;
    

    db.query(myquery, (err, result, field) => {
        if (err) res.render('404', { err });
        else {
            res.render('Recharge', { status: 1 });
        }
    });
});


app.post('/Add_New_Offer', urlencodedParser, function (req, res) {

    var Offer_num = req.body.Offer_num;
    var Offer_describtion = req.body.Offer_describtion;
    var Minutes = req.body.Minutes;
    var Megas = req.body.Megas;
    var Price = req.body.Price;
    var Launch_date = req.body.Launch_date;
    var Expire_date = req.body.Expire_date;

    if (!Offer_describtion)
        Offer_describtion = "NULL";

    if (!Minutes)
        Minutes = "NULL";

    if (!Megas)
        Megas = "NULL";

    if (!Price)
        Price = "NULL";

    if (!Launch_date)
        Launch_date = "NULL";

    if (!Expire_date)
        Expire_date = "NULL";

    let myquery = `
            Insert into wgsa_company.Offer(Launch_date, Price, Minutes, Expire_date, Megas, Offer_describ, Offer_num) values('${Launch_date}', ${Price}, ${Minutes}, '${Expire_date}', ${Megas}, '${Offer_describtion}', ${Offer_num})
            `;

    db.query(myquery, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('DataEmployee', { successMes: 'Done', errmessage: '' });
    });

});


app.post('/Complain_process', urlencodedParser, (req, res) => {

    var Complaint = req.body.User_Complaint;
    var user_pn = us;
    current_date = '2021-08-08';


    let Querytogetmaxcode = ` SELECT MAX(wgsa_company.complaint.C_Code) as m  from wgsa_company.complaint`;
    db.query(Querytogetmaxcode, (err, result, field) => {
        if (err) {
            res.render('404', { err });
            throw err;
        }
        var maxcode = result[0].m;
        maxcode = maxcode + 1;
        console.log(Complaint);
        let myquery1 = `Insert into wgsa_company.complaint (C_Code, C_Descrip, Complaint_by, Complaint_date) values (${maxcode},'${Complaint}','${user_pn}','${current_date}')`;
        db.query(myquery1, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            console.log(result);
        });

    });


});

app.get('/Complain', (req, res) => {
    let query = `Select *
    from wgsa_company.complaint where Complaint_by=${us}`;
    db.query(query, (err, result, field) => {
        console.log(result);
        if (err) {
            res.render('404', { err })
        } else {
            res.render('Complain', { result });
            console.log(result);
        }
    });
});



app.post('/Delete_Complaint', urlencodedParser, (req, res) => {

    var C_Code = req.body.C_Code_to_be_deleted;
    let query = `DELETE FROM wgsa_company.complaint WHERE complaint.C_Code=${C_Code}`;
    db.query(query, (err, result, field) => {
        if (err) {
            res.render('404', { err })
        } else {
            app.get('/Complain', (req, res) => {
                let query1 = `Select *
                    from wgsa_company.complaint`;
                db.query(query1, (err, result, field) => {
                    if (err) {
                        res.render('404', { err })
                    } else {
                        res.render('Complain', { result });
                        console.log(result);
                    }
                });
            });
        }
    });
});

app.get('/Transfer', (req, res) => {
    res.render('Transfer', { errmessage: '', successMes: '' })
});


app.post('/Transfer_balance', urlencodedParser, (req, res) => {

    var user_phone_number = us;                                                 //Gehan sadat
    console.log(us);
    var Recipient_Phone_number = parseInt(req.body.Recipient_phone_num, 10);
    var Balance_to_be_transfered = parseInt(req.body.Balance_to_be_transfered, 10);

    function CheckNumbersEntered() {

        console.log("yes");
        if (Balance_to_be_transfered <= 0 || Recipient_Phone_number <= 0) {
            return res.render('Transfer', { errmessage: 'Please enter valid numbers', successMes: '' });
        }
        else {
            CheckRecipient();
        }

    }

    function CheckRecipient() {

        let queryrecipient = `select *
            from wgsa_company.customer
            where customer.phone_num=${Recipient_Phone_number}; `;

        db.query(queryrecipient, (err, result, field) => { //3
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length === 0) {
                console.log("The recipient number is not fount");
                return res.render('Transfer', { errmessage: 'There is no recipent with such a number', successMes: '' });
            }
            else {
                CheckSufficientbalance();

            }

        });
    }

    function CheckSufficientbalance() {


        let query_customer_curr_balance = `select customer.Balance
            from wgsa_company.customer
            where customer.phone_num='${user_phone_number}';`;

        db.query(query_customer_curr_balance, (err, result1, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result1[0].Balance < Balance_to_be_transfered) {

                console.log("your balance is not sufficient to complete the transfer process");
                return res.render('Transfer', { errmessage: 'your balance is not sufficient to complete the transfer process', successMes: '' });
            }
            else {
                ExecuteTransfer();
            }
        });
    }



    function ExecuteTransfer() {

        console.log("noooooo");
        let query1 = `Update wgsa_company.customer 
                set customer.Balance=customer.Balance-${Balance_to_be_transfered}
                where customer.Phone_num=${user_phone_number}`;

        db.query(query1, (err, result, field) => {//5
            if (err) {
                res.render('404', { err });
                console.log(result);
            } else {

                let query2 = `update wgsa_company.customer
                        set customer.Balance=customer.Balance+${Balance_to_be_transfered}
                        where customer.phone_num=${Recipient_Phone_number};`

                db.query(query2, (err, result, field) => {//6
                    if (err) {
                        res.render('404', { err });
                        console.log(result);
                    } else {

                        return res.render('Transfer', { errmessage: '', successMes: 'Balance is Transfered successfully' });

                    }
                });

            }
        });
    }

    CheckNumbersEntered();

});

//login and register

app.post('/registernew', urlencodedParser, (req, res) => {
    const { Fname, Lname, Phone_number, password, ID } = req.body;
    var gender = req.body.gender;

    
    if (!Fname || !Lname || !Phone_number || !password || !ID || !gender) {
        return res.render('Register', { errmessage: 'Please enter all fields', successMes: '' });
    }
    if (!parseInt(Phone_number) || !parseInt(ID)) {
        return res.render('Register', { errmessage: 'Please enter a Valid number', successMes: '' });
    }

    db.query('select phone_num from customer where phone_num=? or ID=?', [Phone_number, ID], (err, result) => {     // GH: why or ID
        console.log();
        if (err) throw err;
        if (result.length > 0) {
            res.render('Register', { errmessage: 'This Phone is Already registerd', successMes: '' });
        }
        else {      //valid

            if (gender == 'Male')
                gender = 'M';
            else
                gender = 'F';

            if (password.length < 7)
                return res.render('Register', { errmessage: 'Password should be at least 7 characters', successMes: '' });

                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 2).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
            
                today = yyyy + '-' + mm + '-' + dd;

            db.query('insert into customer(Fname,Lname,Phone_num,ID,gender,password,Renewal_date) values(?,?,?,?,?,?,?)', [Fname, Lname, Phone_number, ID, gender, password,today], err => {
                if (err) throw err;
                res.render('Register', { errmessage: '', successMes: 'Registerd You Can now Log in ' });
            });
        }
    }
    );
});

app.post('/loginSubmit', urlencodedParser, (req, res) => {
    const { Phone_number, password } = req.body;
    console.log(Phone_number, password);


    if (!Phone_number || !password) {
        return res.render('Login', { errmessage: 'Please enter all fields', successMes: '' });
    }

    let myquery1 = `Select *
    from wgsa_company.plan,wgsa_company.customer
    where customer.plan_code=plan.Plan_code and customer.Phone_num=${Phone_number}`;

    db.query(myquery1, (err, result) => {
        if (err) throw err;
        
        if (result.length == 0) {
            return res.render('Login', { errmessage: 'This Phone is not Registered yet', successMes: '' });
        }
        if (result[0].Password != password)
            return res.render('Login', { errmessage: 'Wrong Password', successMes: '' });
            
            
        result[0].Renewal_date = result[0].Renewal_date.toString().substr(0, 15);
        us=Phone_number;
        return res.render('Customer', { result });

    }
    );
});
app.get('/CustomerAccount', (req, res) => {

    res.render('CustomerAccount')
});




/*----------------------------------------------------------------HR-----------------------------------*/
app.post('/Add_employee', urlencodedParser, function (req, res) {

    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    var Dnum = req.body.Dnum;
    var Address = req.body.Address;
    var ssn = req.body.SSN;
    var Position = req.body.Position;
    var Salary = req.body.Salary;
    var bnum = parseInt(req.body.bnum, 10);
    var hours = req.body.hours;
    var gender = req.body.Gender;
    var phone_num = req.body.Phone_number;
    var s_ssn = req.body.Super_ssn;
    var Password = req.body.password;

    // NULL VALUES SYNTAX
    if (!s_ssn)
        s_ssn = "NULL";
    if (!Address)
        Address = "NULL";
    if (!hours)
        hours = "NULL";
    if (!gender)
        gender = "NULL";
    if (!phone_num)
        phone_num = "NULL";


    function SSNifexistasln() {

        let query123 = `SELECT
        employee.Ssn
    FROM wgsa_company.employee
    WHERE  employee.Ssn=${ssn};`;

        db.query(query123, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length > 0) {
                console.log("There is an Employee with that SSN");
                return res.render('HR', { errmessage: 'There is an Employee with that SSN', successMes: '' });
            }
            else {
                CHECK_PHONE_NUM_FOR_EMPLOYEE();
            }

        });

    }

    function CHECK_PHONE_NUM_FOR_EMPLOYEE() {

        let query12345 = `select employee.phone_num
    from employee
    where phone_num=${phone_num}`;

        db.query(query12345, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length > 0) {
                console.log("There is another one with that phone number");
                return res.render('HR', { errmessage: 'There is another one with that phone number', successMes: '' });
            }
            else {
                CHECK_PHONE_NUM_FOR_EMPLOYEE_customer();
            }

        });

    }


    function CHECK_PHONE_NUM_FOR_EMPLOYEE_customer() {

        let query123456 = `select *
    from wgsa_company.customer
    where customer.phone_num=${phone_num}; `;

        db.query(query123456, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length > 0) {
                console.log("There is another one with that phone number");
                return res.render('HR', { errmessage: 'There is another one with that phone number', successMes: '' });
            }
            else {
                CHECK_BNUM();
            }

        });

    }

    function CHECK_BNUM() {


        let query1234567 = `select * from wgsa_company.branch where branch.bnum=${bnum}`;

        db.query(query1234567, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length === 0) {
                console.log("There is no branch with that number");
                return res.render('HR', { errmessage: 'There is no branch with that number', successMes: '' });
            }
            else {
                CHECK_superssn();
            }

        });

    }

    function CHECK_superssn() {
        if (s_ssn != "NULL") {

            let query12345678 = `SELECT *
                  
                FROM wgsa_company.employee
                WHERE  employee.ssn=${s_ssn};`;

            db.query(query12345678, (err, result, field) => {
                if (err) {
                    res.render('404', { err });
                    throw err;
                }
                if (result.length === 0) {
                    console.log("There is Super ssn with that number");
                    return res.render('HR', { errmessage: 'There is Super ssn with that number', successMes: '' });
                }
                else {
                    Check_dnum();
                }

            });
        }
        else {

            Check_dnum();
        }


    }

    function Check_dnum() {


        let query123456789 = `select department.Dnum
   from wgsa_company.department
    where dnum=${Dnum}`;

        db.query(query123456789, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length === 0) {
                console.log("There is no department with that number");
                return res.render('HR', { errmessage: 'There is no department with that number', successMes: '' });
            }
            else {
                ExecuteADDnewemployee();
            }

        });

    }

    function ExecuteADDnewemployee() {


        let myquery = `INSERT INTO wgsa_company.employee(Fname, Lname, Dnum, Address, Ssn, Postion, Salary, Branch_num, Hours, Gender, Phone_num, Super_ssn, Password) VALUES("${Fname}", "${Lname}", ${Dnum}, "${Address}", ${ssn}, "${Position}", ${Salary}, ${bnum}, ${hours}, "${gender}", ${phone_num}, ${s_ssn},"${Password}")`;


        db.query(myquery, (err, result, field) => {
            if (err) {
                console.log(err)
                res.render('404', { err });
            } else {
                console.log(result);
                res.render('HR', { successMes: `${Fname} is added as a new employee`, errmessage: '' });
            }
        });

    }
    ExecuteADDnewemployee();

});
app.post('/Add_branch', urlencodedParser, function (req, res) {

    var phone_num = req.body.phone_num;
    var bnum = req.body.bnum;
    var location = req.body.location;

    if (!phone_num)
        phone_num = "NULL";

    if (!location)
        location = "NULL";


    function br_num_exist_in_branch() {

        let qq = `select branch.phone_num
        from wgsa_company.Branch
        where branch.phone_num=${phone_num};`;

        db.query(qq, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length > 0) {
                console.log("Branch Phone Num Already exist");
                return res.render('HR', { errmessage: 'Branch Phone Num Already exist', successMes: '' });
            }
            else {
                br_num_exist_in_customer();
            }
        });
    }

    function br_num_exist_in_customer() {

        let qq = `select customer.phone_num
        from wgsa_company.customer
        where customer.phone_num=${phone_num};`;

        db.query(qq, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length > 0) {
                console.log("Phone Num Already exists in customer");
                return res.render('HR', { errmessage: 'Phone Num Already exists in customer', successMes: '' });
            }
            else {
                br_num_exist_in_employee();
            }
        });
    }

    function br_num_exist_in_employee() {

        let qq = `select employee.phone_num
        from wgsa_company.employee
        where employee.phone_num=${phone_num};`;

        db.query(qq, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length > 0) {
                console.log("Phone Num Already exists in employee");
                return res.render('HR', { errmessage: 'Phone Num Already exists in employee', successMes: '' });
            }
            else {
                br_bnum_exist_in_branch();
            }
        });
    }

    function br_bnum_exist_in_branch() {

        let qq = `select branch.bnum
        from wgsa_company.branch
        where branch.bnum=${bnum};`;

        db.query(qq, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length > 0) {
                console.log("branch Num Already exists");
                return res.render('HR', { errmessage: 'branch Num Already exists', successMes: '' });
            }
            else {
                exec();
            }
        });
    }

    function exec() {
        let myquery = `INSERT INTO wgsa_company.branch(Phone_num, Bnum, Location) VALUES(${phone_num}, ${bnum}, "${location}")`;

        db.query(myquery, (err, result, field) => {
            if (err) {
                console.log(err)
                res.render('404', { err });
            }
            console.log(result);
            res.render('HR', { successMes: 'Done', errmessage: '' });
        });
    }
    br_num_exist_in_branch();
});

app.post('/Remove_branch', urlencodedParser, function (req, res) {

    var bnum = req.body.bnum;
    function br_bnum_exist_in_branch() {

        let qq = `select branch.bnum
        from wgsa_company.branch
        where branch.bnum=${bnum};`;

        db.query(qq, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                throw err;
            }
            if (result.length == 0) {
                console.log("branch Num doesnt exists");
                return res.render('HR', { errmessage: 'branch Num doesnt exists', successMes: '' });
            }
            else {
                exec();
            }
        });
    }

    function exec() {
        let myquery = `delete FROM wgsa_company.branch WHERE branch.bnum =${bnum}`;

        db.query(myquery, (err, result, field) => {
            if (err) {
                console.log(err)
                res.render('404', { err });
            }
            console.log(result);
            res.render('HR', { successMes: 'Done', errmessage: '' });
        });
    }

    br_bnum_exist_in_branch();
});


app.post('/ChangePlan', urlencodedParser, function (req, res) {

    var plan_code = req.body.plan_code;
    var phone_num = us;
    let myquery = `UPDATE wgsa_company.customer SET Plan_code =${plan_code} WHERE Phone_num = ${phone_num}`;
    let query = `select *  from  wgsa_company.customer WHERE Phone_num = ${phone_num}`;

    db.query(myquery, (err, result2, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        }
        console.log(result2);


        db.query(query, (err, result, field) => {
            if (err) {
                console.log(err)
                res.render('404', { err });
            }
            console.log(result);


                res.redirect('Customer');
            });
        });
    });

/*-------------------------------------------------customer service--------------------------------*/
app.post('/change_cplan', urlencodedParser, function (req, res) {

    var plan_code = req.body.plan_code;
    console.log(plan_code);
    var phone_num = req.body.phone_num;
    let myquery = `UPDATE wgsa_company.customer SET Plan_code =${plan_code} WHERE Phone_num = ${phone_num}`;
    let query = `select *  from  wgsa_company.customer WHERE Phone_num = ${phone_num}`;

    db.query(myquery, (err, result2, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        }
        console.log(result2);


        db.query(query, (err, result, field) => {
            if (err) {
                console.log(err)
                res.render('404', { err });
            }
            console.log(result);


            let query2 = `select plan_name,plan_code from wgsa_company.plan `;

            db.query(query2, (err, plans) => {
                if (err) {
                    console.log(err)
                    return res.render('404', { err });
                }


                res.render('CustomerService', { result, plans, errmessage: '', successMes: 'Done' });
            });
        });
    });
});

app.post('/Complain_processCS', urlencodedParser, function (req, res) {

    var phone_num = req.body.Phone_numberC;
    var User_Complaint = req.body.User_Complaint;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    let myquery = `INSERT INTO wgsa_company.complaint ( C_Status, C_Descrip, Complaint_by,Complaint_date) VALUES (  'Wait', ${User_Complaint}, ${phone_num},'${today}');`;
    console.log(myquery);
    db.query(myquery, (err, result2, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        }
        let query2 = `select plan_name,plan_code from wgsa_company.plan `;

        db.query(query2, (err, plans) => {
            if (err) {
                console.log(err)
                return res.render('404', { err });
            }


            res.render('CustomerService', { result: '', plans, errmessage: '', successMes: 'Done' });
        });
    });
});


app.post('/Add_Customer', urlencodedParser, function (req, res) {

    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    var Id = req.body.Id;
    var Phone_num = req.body.Phone_num;
    var Plan_code = req.body.Plan_codeN;
    var Balance = 0;
    var Address = req.body.Address;
    var Used_min = 0;
    var Used_megas = 0;
    var Gender = req.body.gender;
    var Renewal_date = 0;
    var Password = req.body.Password;


    var today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 2).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    Renewal_date = yyyy + '-' + mm + '-' + dd;


    if (Gender == 'Male')
        Gender = 'M';
    else
        Gender = 'F';


    let myquery = `INSERT INTO wgsa_company.customer
        (Fname,Lname,Id,Phone_num,Plan_code,Balance,Address
       ,Gender,Used_min,Used_megas,Renewal_date,Password)
       VALUES('${Fname}','${Lname}',${Id},${Phone_num},${Plan_code}
       ,${Balance},'${Address}','${Gender}',${Used_min},${Used_megas}
       ,'${Renewal_date}','${Password}')`;
    console.log(myquery);
    db.query(myquery, (err, result2, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        } else {
            console.log(result2);

            let myquery1 = `Select * from wgsa_company.customer
            where customer.Phone_num=${Phone_num}`;

            db.query(myquery1, (err, result, field) => {
                if (err) {
                    console.log(err)
                    res.render('404', { err });
                }

                if (result[0].Renewal_date) {
                    result[0].Renewal_date = result[0].Renewal_date.toString().substr(0, 15);
                }


                let query2 = `select plan_name,plan_code from wgsa_company.plan `;
                db.query(query2, (err, plans) => {
                    if (err) {
                        console.log(err)
                        return res.render('404', { err });
                    }
                    console.log(plans);
                    console.log(result);
                    if (result[0].Gender) {
                        if (result[0].Gender == 'M')
                            result[0].Gender = 'Male';
                        else
                            result[0].Gender = 'Female';
                    }
                    res.render('CustomerService', { result, plans, errmessage: '', successMes: 'Done' })
                });

            });
        }
    });

});
app.post('/Add_Customer', urlencodedParser, function (req, res) {

    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    var Id = req.body.Id;
    var Phone_num = req.body.Phone_num;
    var Plan_code = req.body.Plan_code;
    var Balance = req.body.Balance;
    var Address = req.body.Address;
    var Used_min = req.body.Used_min;
    var Used_megas = req.body.Used_megas;
    var Gender = req.body.Gender;
    var Renewal_date = req.body.Renewal_date;
    var Password = req.body.Password;

    if (!Plan_code)
        Plan_code = "NULL";
    if (!Balance)
        Balance = "NULL";
    if (!Used_min)
        Used_min = "NULL";
    if (!Used_megas)
        Used_megas = "NULL";
    if (!Address)
        Address = "NULL";
    if (!Gender)
        Gender = "NULL";
    if (!Renewal_date)
        Renewal_date = "NULL";

    let myquery = `INSERT INTO wgsa_company.customer
         (Fname,Lname,Id,Phone_num,Plan_code,Balance,Address
        ,Gender,Used_min,Used_megas,Renewal_date,Password)
        VALUES("${Fname}","${Lname}",${Id},${Phone_num},${Plan_code}
        ,${Balance},"${Address}","${Gender}",${Used_min},${Used_megas}
        ,"${Renewal_date}","${Password}")`;

    db.query(myquery, (err, result, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        } else {
            console.log(result);
            res.render('CustomerService');
        }
    });

});


app.get('/TechnicalSupport', (req, res) => {

    res.render('TechnicalSupport', { result: '', successMes: '', errmessage: '' })
});

app.post('/change_c_status', urlencodedParser, (req, res) => {

    var complaint_code = req.body.complaint_code;
    var complaint_status = req.body.complaint_status;
    var replied_by = req.body.replied_by;
    var rep_date = req.body.rep_date;
    var reply = req.body.reply;

    let myquery1 = `UPDATE wgsa_company.complaint SET C_Status = '${complaint_status}', Replied_by = ${replied_by}, Reply_date = '${rep_date}' , Reply = '${reply}' WHERE (C_Code = ${complaint_code});`;

    db.query(myquery1, (err, result, field) => {
        if (err) res.render('404', { err });
        console.log(result);
        res.render('TechnicalSupport', { result: '', successMes: 'Done', errmessage: '' });
    });

});
app.post('/Add_faq', urlencodedParser, (req, res) => {

    var question = req.body.question;
    var answer = req.body.answer;
    var code = req.body.code;
    var ID = req.body.ID;

    let myquery1 = `INSERT INTO wgsa_company.faqs (Answer, Question, Question_code, Answered_by) VALUES ('${answer}', '${question}', ${code} , ${ID});`

    db.query(myquery1, (err, result, field) => {
        if (err) res.render('404', { err });
        console.log(result);
        res.render('TechnicalSupport', { result: '', errmessage: '', successMes: 'Done' });
    });

});



