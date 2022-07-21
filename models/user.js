const mongoose=require('mongoose');
const User=mongoose.model('User',new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    last_name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile_no:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    dob:{
        type:Date,
        default:Date.now
    }
}))
module.exports.User=User