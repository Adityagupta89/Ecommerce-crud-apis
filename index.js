const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { DB, PORT } = require("./config/index");
const user_routes = require("./routes/users");
const auth_routes=require('./routes/auth')
app.use(express.json());
app.use("/api/user/", user_routes);
app.use("/api/user/",auth_routes);
mongoose
  .connect(DB)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Listening to the port - ${PORT} `));
