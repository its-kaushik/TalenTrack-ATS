const express = require('express');

const authRouter = require('./auth/auth.router');
const jobPostRouter = require('./jobpost/jobpost.router');
const applicationRouter = require('./application/application.router');
const companyRouter = require('./company/company.router');

const apiV1 = express.Router();

apiV1.use('/auth', authRouter);
apiV1.use('/jobpost', jobPostRouter);
apiV1.use('/application', applicationRouter);
apiV1.use('/company', companyRouter);

module.exports = apiV1;
