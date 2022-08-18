const mongoose = require("mongoose");
const { Product, validateProduct } = require("../models/product");

const getProduct = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

const getProductById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Product Id is not valid");
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Product is not Exist");
  res.send(product);
};

const createProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error)
    return res
      .status(400)
      .send({ msg: error.details[0].message, status: 400, data: "" });

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    weight: req.body.weight,
    description: req.body.description,
    product_image: req.file.path,
    category: req.body.category,
    create_date: req.body.create_date,
    quantity: req.body.quantity,
  });
  try {
    user = await product.save();
  } catch (err) {
    return res.status(400).send({ msg: err.message, data: "", status: 400 });
  }
  res
    .status(201)
    .send({ msg: "Product is created ", status: 201, data: product });
};

const updateProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error)
    return res
      .status(400)
      .send({ msg: error.details[0].message, status: 400, data: "" });
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ msg: "Product Id is not valid", status: 400, data: "" });
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .send({ msg: "The Product was not found.", status: 404, data: "" });
    product.name = req.body.name ? req.body.name : product.name;
    (product.price = req.body.price ? req.body.price : product.price),
      (product.weight = req.body.weight ? req.body.weight : product.weight),
      (product.description = req.body.description
        ? req.body.description
        : product.description),
      (product.product_image = req.file?.path
        ? req.file?.path
        : product.product_image),
      (product.category = req.body.category
        ? req.body.category
        : product.category),
      (product.create_date = req.body.create_date
        ? req.body.create_date
        : product.create_date),
      (product.quantity = req.body.quantity
        ? req.body.quantity
        : product.quantity),
      product.save();
    res.send({ msg: "Product is updated ", status: 201, data: "" });
  } catch (err) {
    // console.log(err)
    res.status(400).send({ msg: err, status: 400, data: "" });
  }
};

const deleteProduct = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Product Id is not valid");
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return res.status(204).send("Product was not found.");

  res.send("product deleted");
};

module.exports.getProduct = getProduct;
module.exports.getProductById = getProductById;
module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
