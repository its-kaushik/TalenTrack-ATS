const express = require('express');
const { createCompanyHttp } = require('./company.controller');

const companyRouter = express.Router();

companyRouter.post('/', createCompanyHttp);

module.exports = companyRouter;
