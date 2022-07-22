const express = require("express");
const orderController = require("../controllers/order-controller");
const router = express.Router();
const auth_middleware = require("../middleware/auth");
//Get Request
router.get("/", orderController.getOrder);
//  Get Request for particular id
router.get("/:id", orderController.getOrderById);
// //Post Request
router.post("/", orderController.createOrder);

// // Put Request
router.put("/:id", orderController.updateOrder);

// // delete request
router.delete("/:id", orderController.deleteOrder);
module.exports = router;
