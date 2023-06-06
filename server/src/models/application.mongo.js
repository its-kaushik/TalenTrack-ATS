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
      default: 'applied', // 1) Applied 2) Interview 1 to N-1.. N) Rejected / Selected
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Application', ApplicationSchema);
