const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

const Book = require('../models/book');

router.get('/', (req,res) => {
    Book.find((err,books) => {
        if (err){
            console.log(err)   
        } else{
        res.render('landing', {books: books})
    }})
});

router.get('/dashboard', ensureAuthenticated, (req,res) =>
    res.render('dashboard',{name: req.user.name}
    )
);

module.exports = router;