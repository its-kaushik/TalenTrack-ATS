const express = require('express');
const { isAuthenticated } = require('../../services/auth');
const {
  createJob,
  getAllJobs,
  getSelfPostedJobs,
  getJob,
  updateJobByID,
} = require('./job.controller');

const jobRouter = express.Router();

jobRouter.post('/', isAuthenticated, createJob);

jobRouter.get('/', getAllJobs);

jobRouter.put('/:id', updateJobByID);

jobRouter.get('/self', isAuthenticated, getSelfPostedJobs);

jobRouter.get('/:id', getJob);

module.exports = jobRouter;
