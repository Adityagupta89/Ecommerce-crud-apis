let Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");
const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      require: true,
    },
    amount: {
      type: Number,
    },
    address_info: {
      address1: String,
      address2: String,
      landmark: String,
      city: String,
      pincode: Number,
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
  })
);
function validateOrder(order) {
  const schema = Joi.object().keys({
    user_id: Joi.objectId(),
    product_id: Joi.objectId(),
    amount: Joi.number().required(),
    address_info: Joi.object().required(),
    order_date: Joi.date(),
  });
  return schema.validate(order);
}

module.exports.Order = Order;
module.exports.validateOrder = validateOrder;
