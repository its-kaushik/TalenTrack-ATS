const statuscodes = require('http-status');

const Company = require('../../models/company.mongo');

async function createCompanyHttp(req, res, next) {
  try {
    const newCompany = new Company({
      ...req.body,
    });

    await newCompany.save();

    res.status(statuscodes.CREATED).json({
      status: statuscodes.CREATED,
      message: 'Company created successfully',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createCompanyHttp,
};
