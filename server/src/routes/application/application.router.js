const express = require('express');

const {
  createApplication,
  getApplicationsByUser,
  getApplicationsGroupedByStage,
  deleteApplicationByID,
  moveToNextStage,
  rejectApplication,
  getAllApplications,
  updateApplication,
} = require('./application.controller');
const { isAuthenticated, isAuthorized } = require('../../services/auth');

const applicationRouter = express.Router();

applicationRouter.post(
  '/',
  isAuthenticated,
  isAuthorized('createApplication'),
  createApplication
);

applicationRouter.get(
  '/',
  isAuthenticated,
  isAuthorized('viewApplications'),
  getAllApplications
);

//applicationRouter.get('/self', isAuthenticated, getApplicationsByUser);

applicationRouter.get(
  '/byGroup',
  isAuthenticated,
  isAuthorized('viewApplications'),
  getApplicationsGroupedByStage
);

//applicationRouter.put('/next/:id', moveToNextStage);

//applicationRouter.put('/reject/:id', rejectApplication);

applicationRouter.delete(
  '/:id',
  isAuthenticated,
  isAuthorized('deleteApplication'),
  deleteApplicationByID
);

applicationRouter.put(
  '/:id',
  isAuthenticated,
  isAuthorized('updateApplication'),
  updateApplication
);

module.exports = applicationRouter;
