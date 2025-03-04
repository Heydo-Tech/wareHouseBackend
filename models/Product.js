const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productCategory: {
    type: String,
    required: true,
  },
  productSubcategory: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  barcode: {
    type: Number,
  },
  expireDate: {
    type: Date,
  },
  sku: {
    type: String,
  },
});

module.exports = mongoose.model('Product', productSchema);