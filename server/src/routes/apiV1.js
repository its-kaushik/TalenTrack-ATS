const express = require('express');

const authRouter = require('./auth/auth.router');
const jobPostRouter = require('./jobpost/jobpost.router');

const apiV1 = express.Router();

apiV1.use('/auth', authRouter);
apiV1.use('/jobpost', jobPostRouter);

module.exports = apiV1;
