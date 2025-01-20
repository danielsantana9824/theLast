const mongoose = require('mongoose');

const businessConfigSchema = new mongoose.Schema({
  businessType: {
    type: String,
    required: true,
    enum: ['RESTAURANT', 'RETAIL', 'SERVICE', 'OTHER']
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  features: [{
    type: String,
    enum: ['INVENTORY', 'ORDERS', 'CUSTOMERS', 'ANALYTICS', 'TABLES', 'APPOINTMENTS']
  }],
  customFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
});

const BusinessConfig = mongoose.model('BusinessConfig', businessConfigSchema);
module.exports = BusinessConfig; 