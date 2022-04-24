const express = require('express')
const router= express.Router()
const passport= require('passport')
const {ensureAuthentication,proofAuthentication}=require('../config/ensure_auth')


// index or home route
router.route('/')
.get(proofAuthentication,(req,res)=>{
    res.render('index')
})
.post(proofAuthentication,(req,res,next)=>{
    // here all stuff done by passport local strategy
    passport.authenticate('local',{
        successRedirect:'/secret',
        failureRedirect:'/',
        failureFlash:true
    })(req,res,next)
})


//secret route
router.get('/secret',ensureAuthentication,(req,res)=>{
    res.render('secret',{user:req.user})
})

router.get('/logout',ensureAuthentication,(req,res)=>{
    req.logOut()
    req.flash('success_msg','Logged Out Successfully!')
    res.redirect('/')
})
module.exports=router