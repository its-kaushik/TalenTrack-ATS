const express = require('express');

const {
  register,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  getProfile,
} = require('./auth.controller');
const upload = require('../../utils/uploadFile');
const { isAuthenticated } = require('../../services/auth');

const authRouter = express.Router();

authRouter.post(
  '/register',
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'profile', maxCount: 1 },
  ]),
  register
);

authRouter.post('/login', login);

authRouter.put('/change-password', isAuthenticated, changePassword);

authRouter.post('/forgot-password', forgotPassword);

authRouter.post('/reset-password', resetPassword);

authRouter.get('/profile', isAuthenticated, getProfile);

module.exports = authRouter;
