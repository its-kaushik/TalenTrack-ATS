const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    jobID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPosting',
      required: true,
    },
    CandidateID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    status: {
      type: String,
      enum: ['applied', 'rejected', 'under-review', 'selected'],
      default: 'applied',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Application', ApplicationSchema);
