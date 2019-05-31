const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const Cart = require('../models/cart');
const Book = require('../models/book');

router.get('/', (req,res) => {
    Book.find((err,books) => {
        if (err){
            console.log(err)   
        } else{
        res.render('landing', {books: books, name: req.user})
    }})
});

router.get('/dashboard', ensureAuthenticated, (req,res) =>
    res.render('dashboard',{name: req.user.name}
    )
);

router.get('/add-to-cart/:id',function(req, res, next){
    var bookId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Book.findById(bookId, function(err, book){
        if(err){
            //msg error item not added please try again
            return res.redirect('/');
        }
        cart.add(book, book.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/')
    });
});

module.exports = router;