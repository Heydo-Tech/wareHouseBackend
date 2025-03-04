const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

const addInventory = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let inventory = await Inventory.findOne({ product: productId });
    if (inventory) {
      inventory.quantity += quantity;
    } else {
      inventory = new Inventory({ product: productId, quantity });
    }

    await inventory.save();
    res.status(201).json({ message: 'Inventory updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const removeInventory = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const inventory = await Inventory.findOne({ product: productId });
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' });

    inventory.quantity -= quantity;
    if (inventory.quantity < 0) inventory.quantity = 0;

    await inventory.save();
    res.json({ message: 'Inventory updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('product');
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addInventory, removeInventory, getAllInventory };