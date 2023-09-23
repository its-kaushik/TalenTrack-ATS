const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const config = require('../config');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is requried'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is requried'],
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
    company: {
      type: String,
      default: 'N/A',
    },
    securityCode: {
      type: String,
    },
    profile: {
      type: String,
      default: config.DEFAULT_PROFILE_URL,
      validate: {
        validator: validator.isURL,
        message: 'Invalid URL',
      },
    },
    resume: {
      type: String,
    },
    role: {
      type: String,
      enum: ['hr', 'candidate'],
      default: 'candidate',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.methods.compareSecurityCode = async function (securityCode) {
  const isMatch = await bcrypt.compare(securityCode, this.securityCode);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
