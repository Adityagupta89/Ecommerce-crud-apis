const Joi = require('joi');
const mongoose=require('mongoose');
const User=mongoose.model('User',new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    last_name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        
    },
    mobile_no:{
        type:Number,
        required:true,
    
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
function validateUser(user) {
    const schema = Joi.object().keys({
      first_name: Joi.string().min(2).max(50).required(),
      last_name: Joi.string().min(2).max(50).required(),
      email: Joi.string().required().email(),
      mobile_no:Joi.number().required(),
      address:Joi.string().min(5).max(100).required(),
      dob:Joi.date().required()
    });
    return schema.validate(user);
  }

module.exports.User=User
module.exports.validateUser=validateUser