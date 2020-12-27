const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// app.set('views', __dirname + '/views');

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
});

app.use(morgan('dev'));


app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});



app.get('/', (req, res) => {
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    
    res.render('home', { title: 'Home', blogs });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'About' });
});



// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});