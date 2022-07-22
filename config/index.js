require("dotenv").config();
module.exports = {
  DB: process.env.DB_URL || "",
  PORT: process.env.APP_PORT || "",
  JWT_PRIVATE_KEY:process.env.JWT_PRIVATE_KEY||"",
};
