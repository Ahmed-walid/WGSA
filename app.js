const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
var bodyParser = require('body-parser')
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '01149873532',
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

    let myquery1 = "SELECT Question_code, Question, Answer, Answered_by from wgsa_company.FAQs";
    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        res.render('FAQS', { result })
    });
});
app.get('/Login', (req, res) => {

    res.render('Login')
});

app.get('/Test', (req, res) => {

    var result = ""
    res.render('Test', { result })
});

app.get('/DataEmployee', (req, res) => {
    res.render('DataEmployee')
});
app.get('/HR', (req, res) => {
    res.render('HR')
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

    res.render('Register')
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


app.post('/Add_New_Plan', urlencodedParser, function(req, res) {

    var Plan_name = req.body.Plan_name;
    var Plan_code = req.body.Plan_code;
    var Minutes = req.body.Minutes;
    var Megas = req.body.Megas;
    var Price = req.body.Price;

    let myquery = `Insert into wgsa_company.plan (Plan_code, Price, Minutes, Megas, Plan_name) values (${Plan_code},${Price},${Minutes},${Megas},"${Plan_name.toString()}")`;


    db.query(myquery, (err, result, field) => {
        if (err) res.render('404', { err });
        else {
            console.log(result);
            res.render('DataEmployee');
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

    let myquery = `
            Insert into wgsa_company.Offer(Launch_date, Price, Minutes, Expire_date, Megas, Offer_describ, Offer_num) values('${Launch_date}', $ { Price }, $ { Minutes }, '${Expire_date}', $ { Megas }, '${Offer_describtion}', $ { Offer_num })
            `;

    db.query(myquery, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('DataEmployee');
    });

});




app.post('/getemployeeinfo', urlencodedParser, (req, res) => {

    var PhoneNumber = req.body.Phone_number;
    //var PhoneNumber = 13654456
    let myquery1 = `
            SELECT * from wgsa_company.Customer where Customer.Phone_num = $ { PhoneNumber }
            `;
    //let myquery2 = "SELECT * from wgsa_company.Customer";
    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('Test', { result });
    });

});




/*----------------------------------------------------------------HR-----------------------------------*/
app.post('/Add_employee', urlencodedParser, function(req, res) {

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



    let myquery = `INSERT INTO wgsa_company.employee(Fname, Lname, Dnum, Address, Ssn, Postion, Salary, Branch_num, Hours, Gender, Phone_num, Super_ssn) VALUES("${Fname}", "${Lname}", ${Dnum}, "${Address}", ${ssn}, "${Position}", ${Salary}, ${bnum}, ${hours}, "${gender}", ${phone_num}, ${s_ssn})`;


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
app.post('/Add_branch', urlencodedParser, function(req, res) {

    var phone_num = req.body.phone_num;
    var bnum = req.body.bnum;
    var location = req.body.location;


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