const express = require('express');
const { isAuthenticated, isAuthorized } = require('../../services/auth');
const {
  createJob,
  getAllJobs,
  getSelfPostedJobs,
  getJob,
  updateJobByID,
} = require('./job.controller');

const jobRouter = express.Router();

jobRouter.post('/', isAuthenticated, isAuthorized('createJob'), createJob);

jobRouter.get('/', isAuthenticated, isAuthorized('viewJobs'), getAllJobs);

jobRouter.put(
  '/:id',
  isAuthenticated,
  isAuthorized('modifyJob'),
  updateJobByID
);

jobRouter.get(
  '/self',
  isAuthenticated,
  isAuthorized('viewJobs'),
  getSelfPostedJobs
);

jobRouter.get('/:id', isAuthenticated, isAuthorized('viewJobs'), getJob);

module.exports = jobRouter;
