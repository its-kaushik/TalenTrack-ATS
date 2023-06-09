const mongoose = require('mongoose');

const JobPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job Title is required.'],
    },
    description: String,
    salaryRange: {
      type: String,
    },
    postedBy: {
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

module.exports = mongoose.model('JobPost', JobPostSchema);
