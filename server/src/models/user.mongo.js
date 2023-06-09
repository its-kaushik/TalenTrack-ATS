const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const resumeSchema = new mongoose.Schema({
  title: String,
  fileURL: String,
});

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
      //select: false,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    resumes: {
      type: [resumeSchema],
    },
    role: {
      type: String,
      immutable: true,
    },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
