const mongoose = require("mongoose");
const { Order, validateOrder } = require("../models/order");
const {User}=require('../models/user');

const getOrder = async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
};

const getOrderById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  const order = await Order.findById(req.params.id);
  if (!order)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(order);
};

const createOrder = async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log(req.body.user_id)
  const user = await User.findOne({_id:req.body.user_id});
  if(!user) return res.status(400).send("User is invalid");
  let order = new Order({
    user_id:req.body.user_id,
    amount:req.body.amount,
    order_address:req.body.amount,
    order_date: req.body.dob,
  });
  try {
    order = await order.save();
  } catch (err) {
    return res.status(400).send(err.message);
  }
  res.status(201).send(order);
};

const updateOrder = async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send("The customer with the given ID was not found.");
    if(req.user_id!='undefined'){
    const user = await User.findOne({_id:req.body.user_id});
    console.log(user)
    if(!user) return res.status(400).send("User is invalid");
    }
      (order.user_id= req.body.user_id ? req.body.user_id  : order.user_id);
      (order.amount= req.body.amount ? req.body.amount  : order.amount);
      (order.order_address = req.body.order_address ? req.body.order_address :order.order_address),
      (order.order_date = req.body.order_date ? req.body.order_date : order.order_date),
      order.save();
    res.send(order);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const deleteOrder = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  const order = await Order.findByIdAndRemove(req.params.id);
  if (!order)
    return res
      .status(204)
      .send("The customer with the given ID was not found.");
  res.send("Order deleted");
};

module.exports.getOrder = getOrder;
module.exports.getOrderById = getOrderById;
module.exports.createOrder = createOrder;
module.exports.updateOrder = updateOrder;
module.exports.deleteOrder = deleteOrder;
