const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

const addInventory = async (req, res) => {
  console.log("Called ")
  const { barcode, sku, quantity } = req.body;
console.log("barcode", barcode);
console.log("sku" ,sku);
  try {
    if ((!barcode && !sku) || quantity === undefined) {
      return res.status(400).json({ message: 'Either Barcode or SKU and quantity are required' });
    }

    let query = {};
    if (barcode) {
      query.barcode = Number(barcode); // Ensure barcode is treated as a number
    } else if (sku) {
      query.sku = sku;
    }
    
    console.log(query);
    let product = await Product.findOne(query);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let inventory = await Inventory.findOne({ product: product._id });

    if (!inventory) {
      inventory = new Inventory({ product: product._id, quantity: 0 });
    }

    inventory.quantity += quantity;
    await inventory.save();

    res.status(201).json({ message: 'Inventory updated successfully', inventory });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const removeInventory = async (req, res) => {
  const { barcode, sku, quantity } = req.body;

  try {
    if ((!barcode && !sku) || quantity === undefined) {
      return res.status(400).json({ message: 'Either Barcode or SKU and quantity are required' });
    }

    let query = {};
    if (!isNaN(barcode)) {
      query.barcode = Number(barcode); // Ensure barcode is treated as a number
    } else if (sku) {
      query.sku = sku;
    }

    let product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let inventory = await Inventory.findOne({ product: product._id });

    if (!inventory) {
      inventory = new Inventory({ product: product._id, quantity: 0 });
      await inventory.save();
      return res.status(200).json({ message: 'Inventory not found, initialized at zero', inventory });
    }

    inventory.quantity = Math.max(0, inventory.quantity - quantity);
    await inventory.save();

    res.json({ message: 'Inventory updated successfully', inventory });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('product');
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// API to get product and inventory details using barcode or SKU
const getProductByBarcodeOrSku = async (req, res) => {
  const { barcode, sku } = req.params;

  try {
    if (!barcode && !sku) {
      return res.status(400).json({ message: 'Either Barcode or SKU is required' });
    }

    let query = {};
    if (!isNaN(barcode)) {
      query.barcode = Number(barcode);
    } else if (sku) {
      query.sku = sku;
    }

    let product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let inventory = await Inventory.findOne({ product: product._id }) || { quantity: 0 };

    res.json({ product, inventory });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { addInventory, removeInventory, getAllInventory, getProductByBarcodeOrSku };
