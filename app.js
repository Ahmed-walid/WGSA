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

    res.render('FAQS')
});
app.get('/Login', (req, res) => {

    res.render('Login')
});

app.get('/Test', (req, res) => {

var result =""
    res.render('Test',{result})
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


app.post('/heatmapp', function (req, res, err) {

    console.log("hey");

    var result = "AHMED";
    // res.send(result);

});


app.post('/login', urlencodedParser, function (req, res) {
    res.send('welcome, ' + req.body.username)
})

app.post('/getemployeeinfo',urlencodedParser, (req, res) => {
     
    var PhoneNumber = req.body.Phone_number;
    //var PhoneNumber = 13654456
    let myquery1 = `SELECT * from wgsa_company.Customer where Customer.Phone_num = ${PhoneNumber}`;
    //let myquery2 = "SELECT * from wgsa_company.Customer";
    db.query(myquery1, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.render('Test',{result});
    });

});