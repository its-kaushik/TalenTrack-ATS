const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['applied', 'in-progress', 'rejected', 'accepted'],
      default: 'applied',
    },
    round: {
      type: Number,
      default: 0,
    },
    lastround: {
      type: String,
      default: 'round-00',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Application', ApplicationSchema);
