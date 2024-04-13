const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
// ==============================================





// CREATE a Product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// GET a Product
const getAProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});



// GET all Products
const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const getAllProds = await Product.find()
        res.json(getAllProds);
    } catch (error) {
        throw new Error(error)
    }
})

// ==============================================

module.exports = { createProduct, getAProduct, getAllProducts };
