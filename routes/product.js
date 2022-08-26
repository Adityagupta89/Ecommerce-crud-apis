const express = require("express");
const productController = require("../controllers/product-controller");
const router = express.Router();
const multer = require("multer");
const { DB } = require("../config/index");
const auth_middleware = require("../middleware/auth");
const admin_middleware = require("../middleware/admin");
// const uploadController = require("../controllers/upload");

router.use(auth_middleware);
// router.use(admin_middleware);

//Get Request
router.get("/", productController.getProduct);

// Get Request
router.get("/search", productController.getProductBySearch);

// Get Request
router.get("/pagination", productController.getProductByPagination);

//  Get Request for particular id
router.get("/:id", productController.getProductById);

//Post Request

router.post(
  "/",
  multer({ dest: "./upload/" }).array("file2", 12),
  productController.createProduct
);

// Put Request:"api/product/edit"
router.put(
  "/edit/:id",
  multer({ dest: "./upload/" }).array("file2", 12),
  productController.updateProduct
);

// delete request
router.delete("/:id", productController.deleteProduct);

module.exports = router;
