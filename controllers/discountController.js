const Discount = require('../models/Discount');
const Product = require('../models/Product');

// Add Discount to Product based on Barcode or SKU
const addDiscount = async (req, res) => {
  const { barcode, sku, discountType, discountValue, startDate, endDate } = req.body;

  try {
    if ((!barcode && !sku) || !discountType || discountValue === undefined || !startDate || !endDate) {
      return res.status(400).json({ message: 'Either Barcode or SKU, and all discount fields are required' });
    }

    let query = {};
    if (barcode && !isNaN(barcode)) {
      query.barcode = Number(barcode); // Ensure barcode is a number
    } else if (sku) {
      query.sku = sku;
    } else {
      return res.status(400).json({ message: 'Invalid Barcode or SKU' });
    }

    // Find product by barcode or SKU
    let product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if an active discount already exists for this product
    const existingDiscount = await Discount.findOne({ 
      product: product._id, 
      endDate: { $gte: new Date() } // Only check for active discounts
    });

    if (existingDiscount) {
      return res.status(400).json({ message: 'A discount already exists for this product' });
    }

    // Create new discount
    const discount = new Discount({
      product: product._id,
      discountType,
      discountValue,
      startDate,
      endDate,
    });

    await discount.save();

    res.status(201).json({ message: 'Discount added successfully', discount });
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Discount for a Product by Barcode or SKU
const getDiscountByBarcodeOrSku = async (req, res) => {
  const { barcode, sku } = req.params;

  try {
    if (!barcode && !sku) {
      return res.status(400).json({ message: 'Either Barcode or SKU is required' });
    }

    let query = {};
    if (barcode && !isNaN(barcode)) {
      query.barcode = Number(barcode);
    } else if (sku) {
      query.sku = sku;
    } else {
      return res.status(400).json({ message: 'Invalid Barcode or SKU' });
    }

    // Find product
    let product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find discount for the product
    let discount = await Discount.findOne({ product: product._id }).populate('product');

    if (!discount) {
      return res.status(404).json({ message: 'No discount found for this product' });
    }

    res.json(discount);
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Discounts
const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().populate('product');
    res.json(discounts);
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { addDiscount, getDiscountByBarcodeOrSku, getAllDiscounts };
