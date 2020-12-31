 const express = require('express');
 const morgan = require('morgan');
const mysql  = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '7561275612'

});

// express app
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

db.connect((err) =>{
    if (err) {
     throw err;
    }
    console.log('my sql connected');
  });


app.get('/createdb',(req,res)=>{
    let sql ='CREATE DATABASE nodemysql';
     
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('database created....');
    });

});

// listen for requests
app.listen(3000,()=>{
    console.log('server started on port 3000');
});

app.get('/makequery',(req,res)=>{
     
    let myquery="SELECT Fname,Salary from nodemysql.Employee";
    db.query(myquery,(err,result,field)=>{
    
        if (err) throw err;
    
        console.log(result);
    
    });

});


app.get('/getemployee',(req,res)=>{
     
    let myquery="SELECT Fname,Salary from nodemysql.Employee";
    db.query(myquery,(err,result,field)=>{
    
        res.render('register', { result });
        if (err) throw err;
    

    });

});


app.get('/',(req,res)=>{
     
    res.render('index')
});
app.get('/FAQS',(req,res)=>{
     
    res.render('FAQS')
});
app.get('/Login',(req,res)=>{
     
    res.render('Login')
});
app.get('/Offers',(req,res)=>{
     
    res.render('Offers')
});
app.get('/plans',(req,res)=>{
     
    res.render('plans')
});
app.get('/Register',(req,res)=>{
     
    res.render('Register')
});





