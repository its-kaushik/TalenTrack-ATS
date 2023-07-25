const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is requried'],
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
      default: 'NA',
    },
    securityCode: {
      type: String,
    },
    profile: {
      type: String,
      default: 'abc.png',
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
