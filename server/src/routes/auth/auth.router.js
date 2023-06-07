const express = require('express');

const { register, login } = require('./auth.controller');
const { isAuthorized, isAuthenticated } = require('../../services/auth');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
/* authRouter.get(
  '/test',
  isAuthenticated,
  isAuthorized('test1'),
  (req, res, next) => {
    res.status(200).json({
      msg: 'secret meri jkaan 3',
    });
  }
); */

module.exports = authRouter;
