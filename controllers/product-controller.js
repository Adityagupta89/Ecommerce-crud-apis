const mongoose = require("mongoose");
const { Product, validateProduct} = require("../models/product");
const getProduct= async (req, res) => {
  const products = await Product.find();
  res.send(products);
};
const getProductById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  const product = await Product.findById(req.params.id);
  if (!product)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(product);
};

const createProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const product= new Product({
    name: req.body.name,
    price: req.body.price,
    weight: req.body.weight,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    create_date: req.body.create_date,
    quantity:req.body.quantity
  });
  try {
    user = await product.save();
  } catch (err) {
    return res.status(400).send(err.message);
  }
  res.status(201).send(product);
};

const updateProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  try {
    const product= await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");
      (product.name = req.body.name  ? req.body.name : product.name);
      (product.price = req.body.price ? req.body.price : product.price),
      (product.weight = req.body.weight ? req.body.weight : product.weight),
      (product.description= req.body.description ? req.body.description : product.description),
      (product.image= req.body.image ? req.body.image : product.image),
      (product.category= req.body.category ? req.body.category : product.category),
      (product.create_date= req.body.create_date ? req.body.create_date : product.create_date),
      (product.quantity= req.body.quantity ? req.body.quantity : product.quantity),
      product.save();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
const deleteProduct = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Id is not valid");
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product)
    return res
      .status(204)
      .send("The customer with the given ID was not found.");

  res.send("product deleted");
};
module.exports.getProduct = getProduct;
module.exports.getProductById = getProductById;
module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
