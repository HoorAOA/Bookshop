const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/login', (req,res) => res.render('login'));

router.get('/signup', (req,res) => res.render('signup'));
router.post('/signup', (req,res) => {
    const {name , email, password, password2} = req.body;
    let errors = [];
    //Validation
    if(!name || !email || !password || !password2){
        errors.push({msg:'Please fill in all required fields'});
    } else if(password.length < 8){
        errors.push({msg:'Password must contain at least 8 characters'});
    } else if(password !== password2){
        errors.push({msg:'Passwords do not match'})
    } 

    if (errors.length > 0){
        res.render('signup',{
            errors,
            name,
            email
        });
    } else {
        User.findOne({email : email})
         .then(user => {
             if(user){
                 errors.push({msg: 'User already exist'});
                 res.render('signup', {
                     errors,
                     name,
                     email
                 });
             } else {
                 const newUser = new User({
                     name,
                     email,
                     password
                 });

                 bcrypt.hash(newUser.password, 10, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            req.flash('success_msg','You successfully registered');
                            res.redirect('/user/login');
                            console.log(newUser);
                        })
                        .catch(err => console.log(err));
                    });
                    // console.log(newUser);
            }
         });
    }
});

module.exports = router;