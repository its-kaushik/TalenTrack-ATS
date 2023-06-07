const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const statuscode = require('http-status');

const User = require('../../models/user.mongo');
const Api404Error = require('../../errors/api404Error');
const BaseError = require('../../errors/baseError');

//const { createUser } = require('../../utils/userFactory');

async function register(req, res, next) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();

    res.status(statuscode.CREATED).send('User has been created.');
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Api404Error('User not found !');

    const isPasswordMatch = await user.comparePassword(req.body.password);
    if (!isPasswordMatch)
      throw new BaseError('Wrong password or email!', statuscode.BAD_REQUEST);

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'secretkey'
    );

    res.status(200).json({
      name: user.name,
      email: user.email,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
};
