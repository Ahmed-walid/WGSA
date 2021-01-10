const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
var bodyParser = require('body-parser')
const { check, body, validationResult } = require('express-validator');
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'7561275612',
    database: 'wgsa_company'
});

// express app
const app = express();


var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.set('view engine', 'ejs');

app.use(express.static('public'));

db.connect((err) => {
    if (err)
    {
        throw err;
    }
    console.log('my sql connected');
});



// listen for requests
app.listen(3000, () => {
    console.log('server started on port 3000');
});

// app.get('/makequery', (req, res) => {

//     let myquery = "SELECT Plan_code,price from wgsa_company.plan";
//     db.query(myquery, (err, result, field) => {

//         if (err) throw err;

//         res.render('plans', { result });
//         //console.log(result);

//     });

// });


// app.get('/plans', (req, res) => {

//     let myquery = "SELECT Plan_code,Plan_name,price from wgsa_company.plan";
//     db.query(myquery, (err, result, field) => {

//         if (err) throw err;

//         res.render('plans', { result });
//         console.log(result);

//     });

// });


// app.get('/getemployee',(req,res)=>{

//     let myquery="SELECT Fname,Salary from nodemysql.Employee";
//     db.query(myquery,(err,result,field)=>{

//         res.render('register', { result });
//         if (err) throw err;


//     });

// });


app.get('/', (req, res) => {

    res.render('index')
});


app.get('/FAQS', (req, res) => {

    let myquery1 = "SELECT Question_code, Question, Answer, Fname,Lname from wgsa_company.FAQs , wgsa_company.employee where Answered_by=Ssn";
    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        res.render('FAQS', { result })
    });
});
app.get('/Login', (req, res) => {
    
    res.render('Login', { errmessage: '', successMes: '' })
});

app.get('/Test', (req, res) => {

    var result = "0"
    res.render('Test', { result })
});

app.get('/Recharge', (req, res) => {
    res.render('Recharge')
});


app.get('/DataEmployee', (req, res) => {
    res.render('DataEmployee')
});
app.get('/HR', (req, res) => {
    res.render('HR')
});
app.get('/', (req, res) => {

    res.render('index')
});

app.get('/CustomerService', (req, res) => {

    res.render('CustomerService')
});

app.get('/Offers', (req, res) => {

    let myquery1 = "SELECT Launch_date, Price, Minutes, Expire_date, Megas, Offer_describ, Offer_num from wgsa_company.Offer";
    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        res.render('Offers', { result })
    });

});
app.get('/plans', (req, res) => {

    let myquery1 = "SELECT  Plan_name,Plan_code, Price, Minutes, Megas from wgsa_company.plan";
    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        res.render('plans', { result })
    });

});
app.get('/Register', (req, res) => {

    res.render('Register', { errmessage: '', successMes: '' })
});

app.get('/Customer', (req, res) => {

    var user_number = 13153957;

    let myquery1 = `Select customer.balance, customer.Renewal_date, customer.gender ,customer.fname,customer.lname, plan.Plan_name,customer.used_megas,customer.used_min
    from wgsa_company.plan,wgsa_company.customer
    where customer.plan_code=plan.Plan_code and customer.Phone_num=${user_number}`;

    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        result[0].Renewal_date=result[0].Renewal_date.toString().substr(0,15);
        console.log(result);
        res.render('Customer', { result })
    });

});


app.post('/heatmapp', function(req, res, err) {

    console.log("hey");

    var result = "AHMED";
    // res.send(result);

});


app.post('/Update_Plan_Cost', urlencodedParser, function(req, res) {

    var Plannewprice = req.body.Plan_New_Price;
    var plancode = req.body.Plan_Code;
    let myquery = `UPDATE wgsa_company.Plan  SET Plan.Price= ${Plannewprice}  where Plan.Plan_code=${plancode}`;

    db.query(myquery, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('DataEmployee', { result });
    });

});
app.post('/Delete_Plan', urlencodedParser, function(req, res) {

    var Plan_code = req.body.Plan_Code;

    let myquery = `delete FROM wgsa_company.PLAN WHERE PLAN.PLAN_CODE =${Plan_code}`;

    db.query(myquery, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('DataEmployee', { result });
    });

});
app.post('/Remove_customer', urlencodedParser, function(req, res) {

    var phone_num = req.body.Phone_num;

    let myquery = `delete FROM wgsa_company.customer WHERE customer.Phone_num =${phone_num}`;

    db.query(myquery, (err, result, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        }
        console.log(result);
        res.render('HR', { result });
    });

});
app.post('/Remove_employee', urlencodedParser, function(req, res) {

    var ssn = req.body.SSN;

    let myquery = `delete FROM wgsa_company.EMPLOYEE WHERE EMPLOYEE.SSN =${ssn}`;

    db.query(myquery, (err, result, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        }
        console.log(result);
        res.render('HR', { result });
    });

});


app.post('/Add_New_Plan', urlencodedParser, function(req, res) {

    var Plan_name = req.body.Plan_name;
    var Plan_code = req.body.Plan_code;
    var Minutes = req.body.Minutes;
    var Megas = req.body.Megas;
    var Price = req.body.Price;

    if(!Minutes)
        Minutes="NULL";

    if(!Megas)
        Megas="NULL";

    let myquery = `Insert into wgsa_company.plan (Plan_code, Price, Minutes, Megas, Plan_name) values (${Plan_code},${Price},${Minutes},${Megas},"${Plan_name.toString()}")`;


    db.query(myquery, (err, result, field) => {
        if (err) res.render('404', { err });
        else {
            console.log(result);
            res.render('DataEmployee');
        }
    });

});

app.post('/Recharge_Process', urlencodedParser, function (req, res) {
    var Card_Serial_Num = req.body.Card_Serial_Num;
    var user_number = 13654456;
    let myquery = `Update wgsa_company.customer
    set customer.balance=customer.balance+ (select Card_value
                                                    from wgsa_company.card
                                                    where card.Serial_number=${Card_Serial_Num})
    where customer.Phone_num=${user_number}`;


    db.query(myquery, (err, result, field) => {
        if (err) res.render('404', { err });
        else {
            console.log(result);
            res.render('Recharge', { status: 1 });
        }
    });
});



app.post('/Add_New_Offer', urlencodedParser, function(req, res) {

    var Offer_num = req.body.Offer_num;
    var Offer_describtion = req.body.Offer_describtion;
    var Minutes = req.body.Minutes;
    var Megas = req.body.Megas;
    var Price = req.body.Price;
    var Launch_date = req.body.Launch_date;
    var Expire_date = req.body.Expire_date;

    if(!Offer_describtion)
        Offer_describtion="NULL";

    if(!Minutes)
        Minutes="NULL";

    if(!Megas)
        Megas="NULL";

    if(!Price)
        Price="NULL";

    if(!Launch_date)
        Launch_date="NULL";

    if(!Expire_date)
        Expire_date="NULL";

    let myquery = `
            Insert into wgsa_company.Offer(Launch_date, Price, Minutes, Expire_date, Megas, Offer_describ, Offer_num) values('${Launch_date}', ${Price}, ${Minutes}, '${Expire_date}', ${Megas}, '${Offer_describtion}', ${Offer_num})
            `;

    db.query(myquery, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('DataEmployee');
    });

});


app.post('/getemployeeinfo', urlencodedParser, (req, res) => {

    var PhoneNumber = req.body.Phone_number;

    let myquery1 = `SELECT * from wgsa_company.Customer where Customer.Phone_num = ${PhoneNumber}`;

    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('Test', { result });
    });

});



app.post('/Complain_process', urlencodedParser, (req, res) => {

    var Complaint = req.body.User_Complaint;
    var user_id = 123987;
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
        let myquery1 = `Insert into wgsa_company.complaint (C_Code, C_Descrip, Complaint_by, Complaint_date) values (${maxcode},'${Complaint}','${user_id}','${current_date}')`;
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
    from wgsa_company.complaint`;
    db.query(query, (err, result, field) => {
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
    res.render('Transfer')
});




app.post('/Transfer_balance', urlencodedParser, (req, res) => {

        var user_phone_number= 13654456 ;
        var Recipient_Phone_number=req.body.Recipient_phone_num;
        var Balance_to_be_transfered =req.body.Balance_to_be_transfered;

        let query1 = `Update wgsa_company.customer 
        set customer.Balance=customer.Balance-${Balance_to_be_transfered}
        where customer.Phone_num=${user_phone_number}`;
        
       
        db.query(query1, (err, result, field) => {
            if (err) {
                res.render('404', { err });
                console.log(result);
            } else {

                let  query2  =`update wgsa_company.customer
                set customer.Balance=customer.Balance+${Balance_to_be_transfered}
                where customer.phone_num=${Recipient_Phone_number};`

                db.query(query2, (err, result, field) => {
                    if (err) {
                        res.render('404', { err });
                        console.log(result);
                    } else {

                        res.render('Transfer');
                        
                    }
                });

            }
        });        
});





//login and register

app.post('/registernew', urlencodedParser, (req, res) => {
    const { Fname, Lname, Phone_number, password, ID } = req.body;
    var gender = req.body.gender;

    if (!Fname || !Lname || !Phone_number || !password || !ID || !gender) {
        return res.render('Register', { errmessage: 'Please enter all fields', successMes: '' });
    }
    if(!parseInt(Phone_number)||!parseInt(ID))
    {
        return res.render('Register', { errmessage: 'Please enter a Valid number', successMes: '' });
    }

    db.query('select phone_num from customer where phone_num=? or ID=?', [Phone_number, ID], (err, result) => {     // GH: why or ID
        console.log();
        if (err) throw err;
        if (result.length > 0) {
            res.render('Register', { errmessage: 'This Phone is Already registerd', successMes: '' });
        }
        else {      //valid

            if (gender == 'male')
                gender = 'M';
            else
                gender = 'F';

            if (password.length < 7)
                return res.render('Register', { errmessage: 'Password should be at least 7 characters', successMes: '' });

            db.query('insert into customer(Fname,Lname,Phone_num,ID,gender,password) values(?,?,?,?,?,?)', [Fname, Lname, Phone_number, ID, gender, password], err => {
                if (err) throw err;
                res.render('Register', { errmessage: '', successMes: 'Registerd You Can now Log in ' });
            });
        }
    }
    );
});

app.post('/loginSubmit', urlencodedParser, (req, res) => {
    const { Phone_number, password } = req.body;
    console.log(Phone_number,password);
    
    if (!Phone_number || !password) {
        return res.render('Login', { errmessage: 'Please enter all fields', successMes: '' });
    }

    db.query('select phone_num,password from customer where phone_num=?', [Phone_number], (err, result) => {
        if (err) throw err;

        if (result.length == 0) {
            return res.render('Login', { errmessage: 'This Phone is not Registered yet', successMes: '' });
        }
        if (result[0].password != password)
            return res.render('Login', { errmessage: 'Wrong Password', successMes: '' });

        return res.render('CustomerAccount', { errmessage: '', successMes: '' });

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
    var bnum = req.body.Bnum;
    var hours = req.body.hours;
    var gender = req.body.Gender;
    var phone_num = req.body.Phone_number;
    var s_ssn = req.body.Super_ssn;
    var Password = req.body.Password;

    // NULL VALUES SYNTAX
    if (!s_ssn)
            s_ssn="NULL";
    if (!Address)
        Address="NULL";
    if (!hours)
        hours="NULL";
    if (!gender)
        gender="NULL";
    if (!phone_num)
        phone_num="NULL";

    let myquery = `INSERT INTO wgsa_company.employee(Fname, Lname, Dnum, Address, Ssn, Postion, Salary, Branch_num, Hours, Gender, Phone_num, Super_ssn, Password) VALUES("${Fname}", "${Lname}", ${Dnum}, "${Address}", ${ssn}, "${Position}", ${Salary}, ${bnum}, ${hours}, "${gender}", ${phone_num}, ${s_ssn},"${Password}")`;


    db.query(myquery, (err, result, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        } else {
            console.log(result);
            res.render('HR');
        }
    });

});
app.post('/Remove_customer', urlencodedParser, function (req, res) {

    var phone_num = req.body.Phone_num;

    let myquery = `delete FROM wgsa_company.customer WHERE customer.Phone_num =${phone_num}`;

    db.query(myquery, (err, result, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        }
        console.log(result);
        res.render('HR', { result });
    });

});

app.post('/Remove_employee', urlencodedParser, function (req, res) {

    var ssn = req.body.SSN;

    let myquery = `delete FROM wgsa_company.EMPLOYEE WHERE EMPLOYEE.SSN =${ssn}`;

    db.query(myquery, (err, result, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        }
        console.log(result);
        res.render('HR', { result });
    });

});
app.post('/Add_branch', urlencodedParser, function (req, res) {

    var phone_num = req.body.phone_num;
    var bnum = req.body.bnum;
    var location = req.body.location;

    if(!phone_num)
        phone_num="NULL";

    if(!location)
        location="NULL";

    let myquery = `INSERT INTO wgsa_company.branch(Phone_num, Bnum, Location) VALUES(${phone_num}, ${bnum}, "${location}")`;

    db.query(myquery, (err, result, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        }
        console.log(result);
        res.render('HR');
    });

});
app.post('/Remove_branch', urlencodedParser, function (req, res) {

    var bnum = req.body.bnum;

    let myquery = `delete FROM wgsa_company.branch WHERE branch.bnum =${bnum}`;

    db.query(myquery, (err, result, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        }
        console.log(result);
        res.render('HR', { result });
    });

});
/*-------------------------------------------------customer service--------------------------------*/
app.post('/change_cplan', urlencodedParser, function (req, res) {

    var plane_code = req.body.plane_code;
    var phone_num = req.body.phone_num;
    let myquery = `UPDATE wgsa_company.customer SET Plan_code =${plane_code} WHERE Phone_num = ${phone_num}`;

    db.query(myquery, (err, result, field) => {
        if (err) {
            console.log(err)
            res.render('404', { err });
        }
        console.log(result);
        res.render('CustomerService', { result });
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

    if(!Plan_code)
        Plan_code="NULL";
    if(!Balance)
        Balance="NULL";
    if(!Used_min)
        Used_min="NULL";
    if(!Used_megas)
        Used_megas="NULL";
    if(!Address)
        Address="NULL";
    if(!Gender)
        Gender ="NULL";
    if(!Renewal_date)
        Renewal_date="NULL";

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



;