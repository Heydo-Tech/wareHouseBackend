const express = require('express');
const Product = require("../models/Product");
const router = express.Router();
// Controller + Route to add a product
router.post('/add-product', async (req, res) => {
  try {
    const {
      productCategory,
      productSubcategory,
      productName,
      barcode,
      expireDate,
      sku,
    } = req.body;

    // Validate required fields
    if (!productCategory || !productSubcategory || !productName) {
      return res.status(400).json({ error: 'Required fields are missing.' });
    }

    const newProduct = new Product({
      productCategory,
      productSubcategory,
      productName,
      barcode,
      expireDate,
      sku,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product', details: error.message });
  }
});

module.exports = router;
