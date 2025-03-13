const express = require('express');
const { addInventory, removeInventory, getAllInventory } = require('../controllers/inventoryController');
const router = express.Router();
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");

router.post('/inventory/add', addInventory);
router.post('/inventory/remove', removeInventory);
router.get('/inventory', getAllInventory);
router.get('/barcode/:barcode', async (req, res) => {
    try {
      const { barcode } = req.params;
      console.log(barcode);
      const product = await Product.findOne({ barcode });
  console.log(product);
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      const inventory = await Inventory.findOne({ product: product._id }) || { quantity: 0 };
  
      res.json({ product, inventory });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
  router.get('/sku/:sku', async (req, res) => {
    try {
      const { sku } = req.params;
      console.log(sku);
      const product = await Product.findOne({ sku });
  console.log(product);
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      const inventory = await Inventory.findOne({ product: product._id }) || { quantity: 0 };
  
      res.json({ product, inventory });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;