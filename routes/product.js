const express = require("express");
const productController = require("../controllers/product-controller");
const router = express.Router();
const auth_middleware = require("../middleware/auth");
const admin_middleware=require("../middleware/admin")

router.use(auth_middleware)
router.use(admin_middleware)

//Get Request
router.get("/", productController.getProduct);

//  Get Request for particular id
router.get("/:id", productController.getProductById);

//Post Request   
router.post("/", productController.createProduct);

// Put Request
router.put("/:id", productController.updateProduct);

// delete request
router.delete("/:id", productController.deleteProduct);

module.exports = router;