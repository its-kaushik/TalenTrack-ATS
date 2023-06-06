const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    address: {
      type: String,
      required: [true, 'Address is required.'],
    },
    logoURL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Company', CompanySchema);
