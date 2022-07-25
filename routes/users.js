const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();
const auth_middleware = require("../middleware/auth");

router.use(auth_middleware);

//Get Request
router.get("/", userController.getUser);

//  Get Request for particular id
router.get("/:id", userController.getUserById);

 //Post Request
router.post("/", userController.createUser);

 // Put Request
router.put("/:id", userController.updateUser);

// delete request
router.delete("/:id", auth_middleware, userController.deleteUser);

module.exports = router;
