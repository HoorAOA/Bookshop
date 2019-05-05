const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5500;
const db = require("./config/keys").MongoURI;

mongoose.connect(db,{useNewUrlParser:true})
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended:true}));
// app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static(__dirname +'/public'));

app.use('/',require('./routes/landing'));
app.use('/user',require('./routes/user'));

app.listen(PORT,() => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
