const mongoose = require("mongoose");
const { reset } = require("nodemon");
const { Product, validateProduct } = require("../models/product");
var fs = require("fs");
const { copySync } = require("file-system");

const getProduct = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

const getProductBySearch = async (req, res) => {
  const search = req.query.search;
  const product = await Product.find();
  const filterData = product.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  return res.send({ msg: "Okk", data: filterData, status: 200 });
};

const getProductByPagination = async (req, res) => {
  const page = req.query.page;
  const category = req.query.category;

  const products = await Product.find({
    category: category,
  });
  const limit = 8;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const resultProduct = products.slice(startIndex, endIndex);
  const maxPage = Math.ceil(products.length / 8);
  res.send({ msg: "Okk", data: resultProduct, maxPage: maxPage, status: 200 });
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
  var fileInfo = [];

  for (var i = 0; i < req.files.length; i++) {
    fileInfo.push(
      Buffer.from(fs.readFileSync(req.files[i].path)).toString("base64")
    );
    fs.unlink(req.files[i].path, function (err) {
      console.log("removed");
    });
  }
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    weight: req.body.weight,
    description: req.body.description,
    product_image: fileInfo,
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

    var fileInfo = [];
    for (var i = 0; i < req.files.length; i++) {
      fileInfo.push(
        Buffer.from(fs.readFileSync(req.files[i].path)).toString("base64")
      );
      fs.unlink(req.files[i].path,function(err){console.log("removed")})
    }

    product.name = req.body.name ? req.body.name : product.name;
    (product.price = req.body.price ? req.body.price : product.price),
      (product.weight = req.body.weight ? req.body.weight : product.weight),
      (product.description = req.body.description
        ? req.body.description
        : product.description),
      (product.product_image = req.files ? fileInfo : product.product_image),
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
module.exports.getProductBySearch = getProductBySearch;
module.exports.getProductByPagination = getProductByPagination;
