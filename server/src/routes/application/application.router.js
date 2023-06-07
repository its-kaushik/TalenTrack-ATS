const express = require('express');
const { isAuthenticated, isAuthorized } = require('../../services/auth');
const {
  createApplicationHttp,
  deleteApplicationHttp,
  getAllApplicationHttp,
  updateApplicationHttp,
  getApplicationHttp,
} = require('./application.controller');

const applicationRouter = express.Router();

applicationRouter.post(
  '/',
  isAuthenticated,
  isAuthorized('createApplication'),
  createApplicationHttp
);

applicationRouter.get(
  '/',
  isAuthenticated,
  isAuthorized('viewApplication'),
  getAllApplicationHttp
);

applicationRouter.get(
  '/:id',
  isAuthenticated,
  isAuthorized('viewApplication'),
  getApplicationHttp
);

applicationRouter.put(
  '/:id',
  isAuthenticated,
  isAuthorized('modifyApplication'),
  updateApplicationHttp
);

applicationRouter.delete(
  '/:id',
  isAuthenticated,
  isAuthorized('deleteApplication'),
  deleteApplicationHttp
);

module.exports = applicationRouter;
