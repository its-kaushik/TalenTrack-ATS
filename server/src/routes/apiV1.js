const express = require('express');

const authRouter = require('./auth/auth.router');

const apiV1 = express.Router();

apiV1.use('/auth', authRouter);

module.exports = apiV1;
