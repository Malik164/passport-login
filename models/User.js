const mongoose = require('mongoose')
const bycrypt= require('bcrypt')
const userSchema=new mongoose.Schema({
    uname:String,
    email:String,
    password:String
})

// method that hash the password
userSchema.methods.hashPassword=async function () {
    try {
        const genSalt = await bycrypt.genSalt(10)
        const hash= await bycrypt.hash(this.password,genSalt)
        return hash
    } catch (error) {
        console.log(error);
    }
}

// method that compare the  typed password with hash
userSchema.methods.comparePassword=async function(input_password) {
    try {

        return await bycrypt.compare(input_password,this.password)
    } catch (error) {
        console.log(error);
    }
}


module.exports=mongoose.model('User',userSchema)

