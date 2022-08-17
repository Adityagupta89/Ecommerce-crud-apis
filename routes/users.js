const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();
const auth_middleware = require("../middleware/auth");
const multer=require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/Profile');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString()+file.originalname);
    }
  });

  var upload = multer({ storage: storage})
//Get <Request></Request>
router.get("/", userController.getUser);

// Put Request for change password
router.put("/changePassword", userController.changePassword);

//  Get Request for particular id
router.get("/:id", userController.getUserById);

//Post Request
router.post("/", upload.single('profileImage'),userController.createUser);

router.post("/updateAddress",userController.updateAddress);


// Put Request update user
router.put("/:id",upload.single('profileImage'), userController.updateUser);

// delete request
router.delete("/:id", auth_middleware, userController.deleteUser);

module.exports = router;
