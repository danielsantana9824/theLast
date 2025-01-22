const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  notes: String,
});

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  items: [orderItemSchema],
  status: {
    type: String,
    enum: ['PENDING', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'REFUNDED'],
    default: 'PENDING',
  },
  paymentMethod: {
    type: String,
    enum: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'MOBILE_PAYMENT'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notes: String,
});

// Update the updatedAt timestamp before saving
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 