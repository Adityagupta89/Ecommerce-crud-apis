const mongoose = require("mongoose");
const { Order, validateOrder } = require("../models/order");
const {User}=require('../models/user');
const {Product}=require('../models/product')
const getOrder = async (req, res) => {
  console.log("In Order");
  const orders = await Order.find().populate('user', 'email mobile_no')
  .populate('product','category price name ')
  .select('order_date ')
  .select('address_info')
  res.send(orders);
};

function getUserWithPosts(username){
  return User.findOne({ username: username })
    .populate('posts').exec((err, posts) => {
      console.log("Populated User " + posts);
    })
}

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
  if (error) return res.status(400).send({msg:error.details[0].message,status:400});
  console.log("Adi")
  console.log(req.body.product_id)
  const user = await User.findOne({_id:req.body.user_id});
  if(!user) return res.status(400).send({msg:"User is invalid",status:400});
  let order = new Order({
    user:req.body.user_id,
    product:req.body.product_id,
    amount:req.body.amount,
    address_info:req.body.address_info,
    order_date: req.body.dob,
  });
  try {
    order = await order.save();
  } catch (err) {
    return res.status(400).send({msg:err.message,status:400});
  }
  res.status(201).send({msg:"Order is created",data:order,status:201});
};

const updateOrder = async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send({msg:error.details[0].message,status:400});
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({msg:"Id is not valid",status:400});
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send({msg:"The customer with the given ID was not found.",status:404});
    if(req.user_id!='undefined'){
    const user = await User.findOne({_id:req.body.user_id});
    console.log(user)
    if(!user) return res.status(400).send({msg:"User is invalid",status:400});
    }
      (order.user_id= req.body.user_id ? req.body.user_id  : order.user_id);
      (order.update_id= req.body.update_id ? req.body.update_id  : order.update_id);
      (order.amount= req.body.amount ? req.body.amount  : order.amount);
      (order.address_info = req.body.address_info ? req.body.address_info :order.address_info),
      (order.order_date = req.body.order_date ? req.body.order_date : order.order_date),
      order.save();
    res.send({msg:"Order is updated",data:order,status:200});
  } catch (err) {
    console.log(err);
    res.status(400).send({msg:err,status:400});
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
