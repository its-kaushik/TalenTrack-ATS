const express = require('express');

const upload = require('../../utils/fileUpload');
const uploadResumeHttp = require('./user.controller');
const { isAuthenticated, isAuthorized } = require('../../services/auth');

const userRouter = express.Router();

userRouter.post(
  '/resume',
  isAuthenticated,
  isAuthorized('modifyresume'),
  upload.single('resume'),
  uploadResumeHttp
);

module.exports = userRouter;
