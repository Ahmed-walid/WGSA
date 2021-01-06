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
    password: '7561275612',
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
        res.render('FAQS',{result})
    });
});
app.get('/Login', (req, res) => {

    res.render('Login')
});

app.get('/Test', (req, res) => {

var result =""
    res.render('Test',{result})
});

app.get('/Recharge',(req,res)=>
{
    res.render('Recharge')
});

app.get('/DataEmployee',(req,res)=>
{
    res.render('DataEmployee')
});

app.get('/Offers', (req, res) => {

    let myquery1 = "SELECT Launch_date, Price, Minutes, Expire_date, Megas, Offer_describ, Offer_num from wgsa_company.Offer";
    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        res.render('Offers',{result})
    });
   
});
app.get('/plans', (req, res) => {

    let myquery1 = "SELECT  Plan_name,Plan_code, Price, Minutes, Megas from wgsa_company.plan";
    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        res.render('plans',{result})
    });
   
});
app.get('/Register', (req, res) => {

    res.render('Register')
});

app.get('/Customer', (req, res) => {

    var user_number=13654456;

    let myquery1= `Select customer.balance, customer.fname, plan.Plan_name
    from wgsa_company.plan,wgsa_company.customer
    where customer.plan_code=plan.Plan_code and customer.Phone_num=${user_number}`;

        db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('Customer',{result})
    });

});


app.post('/heatmapp', function (req, res, err) {

    console.log("hey");

    var result = "AHMED";
    // res.send(result);

});


app.post('/Update_Plan_Cost', urlencodedParser, function (req, res) {
    
    var Plannewprice=req.body.Plan_New_Price;
    var plancode=req.body.Plan_Code;
    let myquery=`UPDATE wgsa_company.Plan  SET Plan.Price= ${Plannewprice}  where Plan.Plan_code=${plancode}`;

    db.query(myquery, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('DataEmployee',{result});
    });  
    
});
app.post('/Delete_Plan', urlencodedParser, function (req, res) {
    
    var Plan_code=req.body.Plan_Code;
 
    let myquery=`delete FROM wgsa_company.PLAN WHERE PLAN.PLAN_CODE =${Plan_code}`;

    db.query(myquery, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('DataEmployee',{result});
    });  
    
});



app.post('/Add_New_Plan', urlencodedParser, function (req, res) {
    
    var Plan_name=req.body.Plan_name;
    var Plan_code=req.body.Plan_code;
    var Minutes=req.body.Minutes;
    var Megas=req.body.Megas;
    var Price=req.body.Price;

    let myquery=`Insert into wgsa_company.plan (Plan_code, Price, Minutes, Megas, Plan_name) values (${Plan_code},${Price},${Minutes},${Megas},"${Plan_name.toString()}")`;


    db.query(myquery, (err, result, field) => {
        if (err) res.render('404',{err});
        else
        {
        console.log(result);
        res.render('DataEmployee');
        }
    });  
    
});


app.post('/Recharge_Process', urlencodedParser, function (req, res)
{
    var Card_Serial_Num=req.body.Card_Serial_Num;
     var user_number=13654456;
    let myquery= `Update wgsa_company.customer
    set customer.balance=customer.balance+ (select Card_value
                                                    from wgsa_company.card
                                                    where card.Serial_number=${Card_Serial_Num})
    where customer.Phone_num=${user_number}`;


    db.query(myquery, (err, result, field) => {
        if (err) res.render('404',{err});
        else
        {
        console.log(result);
        res.render('Recharge',{status:1});
        }
    });  

     

});


app.post('/Add_New_Offer', urlencodedParser, function (req, res) {
    
    var Offer_num=req.body.Offer_num;
    var Offer_describtion=req.body.Offer_describtion;
    var Minutes=req.body.Minutes;
    var Megas=req.body.Megas;
    var Price=req.body.Price;
    var Launch_date=req.body.Launch_date;
    var Expire_date=req.body.Expire_date;

    let myquery=`Insert into wgsa_company.Offer (Launch_date, Price, Minutes, Expire_date, Megas, Offer_describ, Offer_num) values ( '${Launch_date}',${Price},${Minutes},'${Expire_date}',${Megas},'${Offer_describtion}',${Offer_num})`;

    db.query(myquery, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('DataEmployee');
    });  
    
});




app.post('/getemployeeinfo',urlencodedParser, (req, res) => {
     
    var PhoneNumber = req.body.Phone_number;
    //var PhoneNumber = 13654456
    let myquery1 = `SELECT * from wgsa_company.Customer where Customer.Phone_num = ${PhoneNumber}`;
    //let myquery2 = "SELECT * from wgsa_company.Customer";
    db.query(myquery1, (err, result, field) => {
        if (err)  throw err;
        console.log(result);
        res.render('Test',{result});
    });

});


