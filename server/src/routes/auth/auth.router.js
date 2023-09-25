const express = require('express');

const {
  register,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  getProfile,
} = require('./auth.controller');

const { isAuthenticated } = require('../../services/auth');

const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.put('/change-password', isAuthenticated, changePassword);

authRouter.post('/forgot-password', forgotPassword);

authRouter.post('/reset-password', resetPassword);

authRouter.get('/profile', isAuthenticated, getProfile);

module.exports = authRouter;
