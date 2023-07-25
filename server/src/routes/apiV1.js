const express = require('express');
const authRouter = require('./auth/auth.router');
const jobRouter = require('./job/job.router');
const applicationRouter = require('./application/application.router');

const apiV1 = express.Router();

apiV1.use('/auth', authRouter);
apiV1.use('/jobs', jobRouter);
apiV1.use('/applications', applicationRouter);

module.exports = apiV1;
