const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'], // Discount can be percentage-based or a fixed amount
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Discount', discountSchema);
