const mongoose = require('mongoose');
const validator = require('validator');

const CandidateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      validator: {
        validator: validator.isEmail,
        message: 'Invalid Email.',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    resumes: [
      {
        name: String,
        fileUrl: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Candidate', CandidateSchema);
