const mongoose=require('mongoose');
const signup=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        maxLength:32,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        maxLength:32,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    }
})
module.exports=mongoose.model('user',signup);