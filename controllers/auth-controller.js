const {User}=require('../models/user');
require('dotenv').config()
const { JWT_PRIVATE_KEY } = require("../config/index");
const Joi=require('joi')
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const auth=async (req,res)=>{
    console.log("Adi")
    const {error}=validate(req.body)
    if(error)return res.status(400).send(({msg:error.details[0].message,data:"",status:400}));
    let user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send( new Error({msg:"Invalid User",data:"",status:400}))
  
    const validPassword=await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send(({msg:"Invalid Password",data:"",status:400}))
    let token;
    if(user.email=="admin123@thinkitive.com")
     token=jwt.sign({_id:user._id,is_Admin:true},JWT_PRIVATE_KEY)
    else
     token=jwt.sign({_id:user._id,is_Admin:false},JWT_PRIVATE_KEY);
     if(user.email=="admin123@thinkitive.com")
    res.status(200).send({msg:"Successfull Login Admin",data:token,status:200,isAdmin:true,user_id:user._id.toString()});
   else
    res.status(200).send({msg:"Successfull Login User",data:token,status:200,isAdmin:false,user_id:user._id.toString()});
} 
function validate(user) {
    const schema = Joi.object().keys({
      email: Joi.string().min(5).max(255).required().email(),
      password:Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
  }
module.exports.auth=auth;