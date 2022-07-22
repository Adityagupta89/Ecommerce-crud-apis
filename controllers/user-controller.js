const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User, validateUser, validateUserUpdate } = require("../models/user");
const getUser = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const getUserById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  const user = await User.findById(req.params.id);
  if (!user)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(user);
};

const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");
  user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    mobile_no: req.body.mobile_no,
    address: req.body.address,
    dob: req.body.dob,
  });
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();
  } catch (err) {
    return res.status(400).send(err.message);
  }
  res.status(201).send(user);
};

const updateUser = async (req, res) => {
  const { error } = validateUserUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");
 
     (user.first_name = req.body.first_name ? req.body.first_name : user.first_name);
    (user.last_name = req.body.last_name ? req.body.last_name : user.last_name),
      (user.email = req.body.email ? req.body.email : user.email),
      (user.password = req.body.password ? req.body.password : user.password),
      (user.mobile_no = req.body.mobile_no ? req.body.mobile_no : user.mobile_no),
      (user.address = req.body.address ? req.body.address : user.address),
      (user.dob = req.body.dob ? req.body.dob : user.dob),
      user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
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
