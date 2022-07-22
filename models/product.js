const Joi = require('joi');
const mongoose=require('mongoose');
const Product=mongoose.model('Product',new mongoose.Schema({
     name:{
        type:String,
        minlength:5,
        maxlength:50
    },
    price:{
        type:Number,
        require:true
    },
    weight:Number,
    description:{
        type:String,
        required:true,
    },
    image:String,
    category:String,
    create_date:{
        type:Date,
        default:Date.now,
    },
    quantity:{
        type:Number,
        require:true
    }
}))
function validateProduct(product) {
    const schema = Joi.object().keys({
      name: Joi.string().min(2).max(50).required(),
      price: Joi.number().required(),
      weight: Joi.number(),
      description:Joi.string().min(5).max(255).required(),
      quantity:Joi.number().required(),
      image:Joi.string(),
      category:Joi.string(),
      create_date:Joi.date()
    });
    return schema.validate(product);
  }
module.exports.Product=Product
module.exports.validateProduct=validateProduct
