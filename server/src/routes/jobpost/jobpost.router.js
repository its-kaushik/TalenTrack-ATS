const express = require('express');
const {
  createJobPostHttp,
  getAllJobPostsHttp,
  getJobPostHttp,
  deleteJobPostHttp,
  updateJobPostHttp,
} = require('./jobpost.controller');
const { isAuthenticated, isAuthorized } = require('../../services/auth');

const jobPostRouter = express.Router();

jobPostRouter.post(
  '/',
  isAuthenticated,
  isAuthorized('modifyJobs'),
  createJobPostHttp
);

jobPostRouter.get(
  '/',
  isAuthenticated,
  isAuthorized('viewJobs'),
  getAllJobPostsHttp
);

jobPostRouter.get(
  '/:id',
  isAuthenticated,
  isAuthorized('viewJobs'),
  getJobPostHttp
);

jobPostRouter.put(
  '/:id',
  isAuthenticated,
  isAuthorized('modifyJobs'),
  updateJobPostHttp
);

jobPostRouter.delete(
  '/:id',
  isAuthenticated,
  isAuthorized('modifyJobs'),
  deleteJobPostHttp
);

module.exports = jobPostRouter;
