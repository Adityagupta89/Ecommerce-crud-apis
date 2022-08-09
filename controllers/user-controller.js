const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User, validateUser, validateUserUpdate } = require("../models/user");

const getUser = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const getUserById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({msg:"Id is not valid",status:400,data:''});
  const user = await User.findById(req.params.id);
  if (!user)
    return res
      .status(404)
      .send({msg:"The customer with the given ID was not found.",status:404,user:''});
  res.send({msg:"Get User",status:200,data:user});
};
 

const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({msg:error.details[0].message,status:400,data:""});
  let user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (user) return res.status(400).send({msg:"This Email already registered.",data:"",status:400});

  user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    mobile_no: req.body.mobile_no,
    address_info: req.body.address_info,
    dob: req.body.dob,
  });

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();
  } catch (err) {
    return res.status(400).send({msg:err.message,status:400,data:""});
  }
  res.status(201).send({msg:"User Created",status:201,data:user});
};

const updateUser = async (req, res) => {
  const { error } = validateUserUpdate(req.body);
  if (error) return res.status(400).send({msg:error.details[0].message,status:400});
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send({msg:"Id is not valid",status:400});
    let password;
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user) return res.status(404).send({msg:"The customer with the given ID was not found.",status:404});
    if(req.body.password){
    const salt = await bcrypt.genSalt(10);
    password  = await bcrypt.hash(req.body.password, salt);
    }
    user.first_name = req.body.first_name? req.body.first_name : user.first_name;
    user.last_name = req.body.last_name ? req.body.last_name : user.last_name,
      user.email = req.body.email ? req.body.email : user.email,
      user.password = req.body.password ? password : user.password,
      user.mobile_no = req.body.mobile_no ? req.body.mobile_no : user.mobile_no,
      user.address_info = req.body.address_info ? req.body.address_info : user.address_info,
      user.dob = req.body.dob ? req.body.dob : user.dob,
      user.save();
    console.log(user);
    res.send({msg:"Data Updated ",data:user,status:200});
  } catch (err) {
    res.status(400).send({msg:err,status:400});
  }
};

const deleteUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res
      .status(204)
      .send("The customer with the given ID was not found.");

  res.send("User deleted");
};

module.exports.getUser = getUser;
module.exports.getUserById = getUserById;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
