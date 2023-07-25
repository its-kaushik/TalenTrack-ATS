const express = require('express');

const {
  createApplication,
  getApplicationsByUser,
  getApplicationsGroupedByStage,
  deleteApplicationByID,
  moveToNextStage,
  rejectApplication,
  getAllApplications,
} = require('./application.controller');
const { isAuthenticated } = require('../../services/auth');

const applicationRouter = express.Router();

applicationRouter.post('/', isAuthenticated, createApplication);

applicationRouter.get('/', isAuthenticated, getAllApplications);

//applicationRouter.get('/self', isAuthenticated, getApplicationsByUser);

applicationRouter.get('/byGroup', getApplicationsGroupedByStage);

applicationRouter.put('/next/:id', moveToNextStage);

applicationRouter.put('/reject/:id', rejectApplication);

applicationRouter.delete('/:id', isAuthenticated, deleteApplicationByID);

module.exports = applicationRouter;
