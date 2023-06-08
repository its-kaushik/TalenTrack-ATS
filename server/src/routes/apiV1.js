const express = require('express');

const authRouter = require('./auth/auth.router');
const jobPostRouter = require('./jobpost/jobpost.router');
const applicationRouter = require('./application/application.router');
const companyRouter = require('./company/company.router');
const userRouter = require('./user/user.router');

const apiV1 = express.Router();

apiV1.use('/auth', authRouter);
apiV1.use('/jobpost', jobPostRouter);
apiV1.use('/application', applicationRouter);
apiV1.use('/company', companyRouter);
apiV1.use('/user', userRouter);

module.exports = apiV1;
