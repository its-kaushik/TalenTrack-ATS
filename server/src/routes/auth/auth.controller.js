const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { responseHandler } = require('../../utils/responseHandler');
const User = require('../../models/user.mongo');
const BaseError = require('../../errors/baseError');
const createTemplate = require('../../utils/templateGenerator');
const emailService = require('../../services/email');

async function register(req, res, next) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //console.log(req.files);

    //console.log(req.files.profile?.[0].path)

    const profileURL =
      req.files.profile?.[0].path.slice(13) ?? 'profile-default.png';
    const resumeURL = req.files.resume?.[0].path.slice(13) ?? 'NA';

    const newUser = new User({
      ...req.body,
      profile: profileURL,
      resume: resumeURL,
      password: hash,
    });

    await newUser.save();

    responseHandler(res, null, 'User Created Successfully', 201);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new BaseError('User not found', 404);

    const isPasswordMatch = await user.comparePassword(req.body.password);
    if (!isPasswordMatch) throw new BaseError('Wrong password!', 400);

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );

    responseHandler(res, {
      name: user.name,
      email: user.email,
      id: user.id,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
}

async function changePassword(req, res, next) {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) throw new BaseError('User not found', 404);

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatch) throw new BaseError('Wrong password', 400);

    const salt = bcrypt.genSaltSync(10);
    const newPasswordHash = bcrypt.hashSync(req.body.newPassword, salt);

    user.password = newPasswordHash;
    await user.save();

    responseHandler(res, null, 'Password changed successfully');
  } catch (err) {
    next(err);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new BaseError('User not found', 404);

    const securityCode = (Math.floor(Math.random() * 90000) + 10000).toString();

    //TODO: Send this security code to user registered email.
    console.log(securityCode);

    const salt = bcrypt.genSaltSync(10);
    const newSecurityCode = bcrypt.hashSync(securityCode, salt);

    user.securityCode = newSecurityCode;
    await user.save();

    const emailData = {
      to: user.email,
      subject: 'Password Reset Code',
    };

    const data = {
      name: user.name,
      code: securityCode,
    };

    const emailTemplate = createTemplate(data, 'resetCode');

    await emailService(emailData, emailTemplate);

    console.log('email sent');

    responseHandler(res, null, 'Reset code sent successfully');
  } catch (err) {
    next(err);
  }
}

async function resetPassword(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new BaseError('User not found', 404);

    const isSecurityMatch = await user.compareSecurityCode(
      req.body.securityCode
    );
    if (!isSecurityMatch) throw new BaseError('Wrong Security Code', 400);

    const salt = bcrypt.genSaltSync(10);
    const newPasswordHash = bcrypt.hashSync(req.body.newPassword, salt);

    user.password = newPasswordHash;
    user.securityCode = '';
    await user.save();

    responseHandler(res, null, 'Password changed successfully');
  } catch (err) {
    next(err);
  }
}

async function getProfile(req, res, next) {
  try {
    const user = await User.findOne(
      {
        email: req.user.email,
      },
      {
        name: 1,
        email: 1,
        company: 1,
        profile: 1,
        resume: 1,
      }
    );
    if (!user) throw new BaseError('User not found', 404);

    responseHandler(res, user);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  getProfile,
};
