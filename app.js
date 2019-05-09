const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5500;

//MongoDB Config 
const db = require('./config/keys').MongoURI;

//MongoDB Connect
mongoose.connect(db,{useNewUrlParser:true})
.then(()=> console.log('MongoDB connected'))
.catch(err => console.log(err));

app.set("view engine", "ejs");
app.use(express.static(__dirname +'/public'));

//bodyParser
app.use(bodyParser.urlencoded({extended:true}));

//Routes
app.use('/',require('./routes/landing'));
app.use('/user',require('./routes/user'));

app.listen(PORT,() => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
