const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res)=>{
    res.render('auth/login.ejs');
})

router.post('/login', async (req, res)=>{
    try{
        console.log(req.body);
        const user = await User.findOne({username: req.body.username});
        console.log(user);
        const validLogin = await bcrypt.compare(req.body.password, user.password);
        console.log(validLogin);
        if(!validLogin){
            res.json({
                status: 500,
                data: "WHOOPS BAD LOGIN"
            })
        }
        req.session.userId = user._id
        res.json({
            status: 200,
            data: user
        })
    }catch(err){
        res.json({
            status: 500,
            data: err
        })
    }
    
})

module.exports = router;