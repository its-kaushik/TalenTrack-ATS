const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
      required: true,
    },
    appliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      default: 'applied', // 1) Applied 2) Interview 1 to N-1.. N) Rejected / Selected
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Application', ApplicationSchema);
