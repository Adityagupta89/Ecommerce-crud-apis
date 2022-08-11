const Joi = require('joi');
const mongoose=require('mongoose');
const User=mongoose.model('User',new mongoose.Schema({
    first_name:{
        type:String,
        minlength:2,
        maxlength:50
    },
    last_name:{
        type:String,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        minlength:5,
        maxlength:1024,
    },
    mobile_no:{
        type:Number,
    },
    address_info:{
      address1:String,
      address2:String,
      landmark:String,
      city:String,
      pincode:Number,
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
      password:Joi.string().min(5).max(255).required(),
      mobile_no:Joi.number().required(),
      address_info:Joi.object().required(),
      dob:Joi.date(),
    });
    return schema.validate(user);
  }
function validateUserUpdate(user) {
    const schema = Joi.object().keys({
      first_name: Joi.string().min(2).max(50),
      last_name: Joi.string().min(2).max(50),
      email: Joi.string().email(),
      password:Joi.string().min(5).max(255),
      mobile_no:Joi.number(),
      address_info:Joi.object(),
      dob:Joi.date(),
    });
    return schema.validate(user);
  }
function validateAdmin(userAdmin) {
    const schema = Joi.object().keys({
      email: Joi.string().required().email(),
      password:Joi.string().min(5).max(255).required(),
    });
    return schema.validate(user);
  }
function validatePassword(user) {
    const schema = Joi.object().keys({
      email: Joi.string().required().email(),
      oldpassword:Joi.string().min(5).max(255).required(),
      newpassword:Joi.string().min(5).max(255).required(),
    });
    return schema.validate(user);
  }

module.exports.User=User;
module.exports.validateUser=validateUser
module.exports.validateUserUpdate=validateUserUpdate
module.exports.validateAdmin=validateAdmin
module.exports.validatePassword=validatePassword
