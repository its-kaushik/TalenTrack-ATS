const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Invalid Email Address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    companyID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    resumes: [
      {
        name: String,
        fileUrl: String,
      },
    ],
    role: {
      type: String,
      immutable: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
