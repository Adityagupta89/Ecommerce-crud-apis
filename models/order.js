let Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const mongoose=require('mongoose');
const Order=mongoose.model('Order',new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
      },
    amount:{
        type:Number,
    },
    order_address:{
        type:String,
     
    },
    order_date:{
        type:Date,
        default:Date.now
    }
}))
function validateOrder(order) {
    const schema = Joi.object().keys({
      user_id: Joi.objectId(),
      amount:Joi.number().required(),
      order_address:Joi.string().required(),
      order_date:Joi.date()
    });
    return schema.validate(order);
  }

module.exports.Order=Order
module.exports.validateOrder=validateOrder
