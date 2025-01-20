const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    min: 0
  },
  unit: String,
  customFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'BusinessConfig'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);
module.exports = InventoryItem; 