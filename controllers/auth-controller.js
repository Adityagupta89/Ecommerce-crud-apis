const {User}=require('../models/user');
require('dotenv').config()
const { JWT_PRIVATE_KEY } = require("../config/index");
const Joi=require('joi')
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const auth=async (req,res)=>{
    const {error}=validate(req.body)
    if(error)return res.status(400).send(error.details[0].message);
    let user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email ')
    console.log(user);
    console.log(req.body.password,user.password);
    const validPassword=await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send('Invalid password')
    const token=jwt.sign({_id:user._id},JWT_PRIVATE_KEY);
    res.send(token)
     
}
function validate(user) {
    const schema = Joi.object().keys({
      email: Joi.string().min(5).max(255).required().email(),
      password:Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
  }
module.exports.auth=auth;