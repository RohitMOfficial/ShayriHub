const mongoose=require('mongoose');
const { ObjectId } = mongoose.Schema;
const notes=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:false
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
       
        unique:true
    },
    category:{
        type: String,
        required: true
    },
    like:{
        type:Number,
        default:0,
    }
})
module.exports=mongoose.model('shayri',notes);