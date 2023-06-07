const statuscodes = require('http-status');

const Application = require('../../models/application.mongo');
const SearchQueryBuilder = require('../../utils/searchQueryBuilder');

async function createApplicationHttp(req, res, next) {
  try {
    //TODO - Add validation to ensure same user has not already applied.

    const newApplication = new Application({
      ...req.body,
      CandidateID: req.user.id,
    });

    await newApplication.save();

    res.status(statuscodes.CREATED).json({
      status: statuscodes.CREATED,
      message: 'Application created successfully!.',
    });
  } catch (err) {
    next(err);
  }
}

async function getAllApplicationHttp(req, res, next) {
  try {
    const getApplications = new SearchQueryBuilder(
      Application.find(),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const applications = await getApplications.query;

    res.status(statuscodes.OK).json({
      status: statuscodes.OK,
      results: applications.length,
      data: {
        applications,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function getApplicationHttp(req, res, next) {
  try {
    const application = Application.findById(req.params.id);

    res.status(statuscodes.OK).json({
      status: statuscodes.OK,
      data: {
        application,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function updateApplicationHttp(req, res, next) {
  try {
    //TODO - Add validation to ensure candidate can update only current application.

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(statuscodes.OK).json({
      status: statuscodes.OK,
      message: 'Application updated successfully!',
      data: {
        updatedApplication,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function deleteApplicationHttp(req, res, next) {
  try {
    //TODO - Add validation to ensure user can only delete his application

    await Application.findByIdAndDelete(req.params.id);

    res.status(statuscodes.OK).json({
      status: statuscodes.OK,
      message: 'Application Deleted Successfully',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createApplicationHttp,
  getAllApplicationHttp,
  getApplicationHttp,
  updateApplicationHttp,
  deleteApplicationHttp,
};
