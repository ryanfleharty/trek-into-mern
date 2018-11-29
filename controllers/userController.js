const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.get('/', (req, res)=>{
    res.render('users/index.ejs')
})

router.get('/new', (req, res)=>{
    res.render('users/new.ejs');
})

router.post('/', async (req, res)=>{
    try{
        console.log("TRYNA REGISTER");
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUserObject = {
            username: req.body.username,
            password: hashedPassword
        }
        const newUser = await User.create(newUserObject);
        req.session.userId = newUser._id;
        console.log(newUser);
        res.json({
            status: 200,
            data: newUser
        })
    } catch(err){
        res.json({
            status: 500,
            data: err
        })
    }
})

module.exports = router;

