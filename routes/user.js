const express = require('express');
const router = express.Router();

router.get('/login', (req,res) => res.render('login'));

router.get('/signup', (req,res) => res.render('signup'));
router.post('/signup', (req,res) => {
    const {name , email, password, password2} = req.body;
    let errors = [];
    
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
        res.redirect('/');
    }
});

module.exports = router;