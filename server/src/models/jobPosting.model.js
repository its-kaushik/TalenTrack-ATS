const mongoose = require('mongoose');

const JobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requried: [true, 'Job Title is required.'],
    },
    description: String,
    salaryRange: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HR',
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

module.exports = mongoose.model('JobPosting', JobPostingSchema);
