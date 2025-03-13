const express = require('express');
const router = express.Router();
const { addDiscount, getDiscountByBarcodeOrSku, getAllDiscounts } = require('../controllers/discountController');

router.post('/add', addDiscount); // Add a discount to a product
router.get('/product/:barcode?/:sku?', getDiscountByBarcodeOrSku); // Get discount for a product using barcode or SKU
router.get('/all', getAllDiscounts); // Get all discounts

module.exports = router;
