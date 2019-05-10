const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const flash = require('connect-flash');
const session = require('express-session');

//MongoDB Config 
const db = require('./config/keys').MongoURI;

//MongoDB Connect
mongoose.connect(db,{useNewUrlParser:true})
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.log(err));

//EJS
app.set("view engine", "ejs");

app.use(express.static(__dirname +'/public'));

//bodyParser
app.use(bodyParser.urlencoded({extended:true}));

//express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


//Routes
app.use('/',require('./routes/landing'));
app.use('/user',require('./routes/user'));

const PORT = process.env.PORT || 5500;

app.listen(PORT,() => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
