const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job Title is required.'],
    },
    description: {
      type: String,
      default: 'N/A',
    },
    salaryRange: {
      type: String,
      default: 'N/A',
    },
    totalRounds: {
      type: Number,
      required: [true, 'Total Rounds are required'],
    },
    positions: {
      type: Number,
      default: 1,
    },
    hr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Job', JobSchema);
