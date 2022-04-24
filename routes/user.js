const express = require('express')
const router= express.Router()
const User= require('../models/User')
const app= express()
app.use(express.urlencoded({extended:false}))
const {ensureAuthentication,proofAuthentication}=require('../config/ensure_auth')



// sign up route
router.route('/sign')
.get(proofAuthentication,(req,res)=>{
    const user= new User()
    res.render('signup',{user})
})
.post(proofAuthentication, async(req,res)=>{
    try {
        // save user if none of user's field is empty
        const {uname,email,password}= req.body
        // make new user for saving to database
        const user= new User({
            uname,
            email,
            password
        })
        if(!uname || !email || !password){
            req.flash('err_msg','Please fill all the fields')
            res.status(400).render('signup',{user})
            return
        }
        // otherwise get the hashed password and save it to database
        const hash= await user.hashPassword()
        user.password=hash
        await user.save()

        req.flash('success_msg','Successfully created account!')
        res.redirect('/')

        
    } catch (error) {
        res.sendStatus(500)
        console.log(error);
    }
})



module.exports=router