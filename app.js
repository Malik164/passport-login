require('dotenv').config()
const express = require('express')
const app= express()
    const session= require('express-session')
const mongoose= require('mongoose')
const flash= require('express-flash')
const passport= require('passport')
require('./config/passport_local')(passport)
// app setup
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
// -------------serve static files express setup-----------
app.use('*/css',express.static(__dirname+'/public'))
app.use(express.static('./public'))

//----------------mongoose connection setup-------------
mongoose.connect('mongodb://localhost/authDB').then(()=>console.log('db is connected')).catch(e=>console.log(e.message))

//------------- EXPRESS SESSION SETUP------------------
app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:true
}))

//------------- passport setup--------------------
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//------------- GLOBAL VARIALBES FOR SHOWING MESSAGES-----------------
app.use(function(req,res,next) {
    res.locals.err_msg=req.flash('err_msg')
    res.locals.success_msg=req.flash('success_msg')
    res.locals.error=req.flash('error')
    next()
})

// -------------- index or home route-------------------
app.use('/',require('./routes/home'))

// -------------- Sing up route-------------------
app.use('/user',require('./routes/user'))


app.listen(process.env.PORT||3000 ,console.log('SERVER is runing at http://127.0.0.1:3000'))