const express = require("express");
const productController = require("../controllers/product-controller");
const router = express.Router();
const multer=require('multer')
const auth_middleware = require("../middleware/auth");
const admin_middleware=require("../middleware/admin")

router.use(auth_middleware)
router.use(admin_middleware)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString()+file.originalname);
    }
  });
   
  var upload = multer({ storage: storage})
//Get Request
router.get("/", productController.getProduct);

//  Get Request for particular id
router.get("/:id", productController.getProductById);

//Post Request   
router.post("/",upload.single('productImage'), productController.createProduct);

// Put Request:"api/product/edit"
router.put("/edit/:id",upload.single('productImage'), productController.updateProduct);

// delete request
router.delete("/:id", productController.deleteProduct);

module.exports = router;
