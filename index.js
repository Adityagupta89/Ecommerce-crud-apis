const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { DB, PORT, ADMIN_PASSWORD } = require("./config/index");
const user_routes = require("./routes/users");
const product_routes = require("./routes/product");
const order_routes = require("./routes/order");
const auth_routes = require("./routes/auth");
const { User } = require("./models/user");
const bcrypt = require("bcrypt");
const cors=require('cors')
app.use(express.json());
app.use(cors({
  origin:"*"
}))
app.use('/uploads',express.static('uploads'))
app.use("/api/user/", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/product", product_routes);
app.use("/api/order/", order_routes);
mongoose
  .connect(DB) 
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

app.listen(PORT, async () => {
  let user = await User.findOne({ email: "admin123@thinkitive.com" });
  if (!user) {
    user = new User({
      first_name: "Aditya",
      last_name: "Gupta",
      email: "admin123@thinkitive.com",
      password: ADMIN_PASSWORD,
      address_info:{
        address1:'Pan Card Club Road',
        address2:'Shree laxmi pg Baner Pune',
        landmark:'Seedling pre School',
        city:'Pune',
        pincode:'244001',
      },
      mobile_no: "7300570080",
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();
  }
  console.log(`Listening to the port - ${PORT} `);
});
