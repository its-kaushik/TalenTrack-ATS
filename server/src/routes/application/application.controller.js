const statuscodes = require('http-status');

const Application = require('../../models/application.mongo');
const SearchQueryBuilder = require('../../utils/searchQueryBuilder');
const createTemplate = require('../../utils/templateGenerator');
const emailService = require('../../services/email');

async function createApplicationHttp(req, res, next) {
  try {
    //TODO - Add validation to ensure same user has not already applied.

    const newApplication = new Application({
      ...req.body,
      appliedBy: req.user.id,
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

    const applications = await getApplications.query.populate('job').populate({
      path: 'appliedBy',
      select: 'id name email',
    });

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
    const application = await Application.findById(req.params.id)
      .populate('job')
      .populate({
        path: 'appliedBy',
        select: 'id name email',
      });

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
    )
      .populate({
        path: 'job',
        select: '_id title description postedBy',
        populate: {
          path: 'postedBy',
          select: '_id name email company',
          populate: {
            path: 'company',
            select: '_id name logoURL',
          },
        },
      })
      .populate({
        path: 'appliedBy',
        select: '_id name email',
      });

    const emailData = {
      to: updatedApplication.appliedBy.email,
      subject: 'Application Status Update',
    };

    const data = {
      applicant: {
        name: updatedApplication.appliedBy.name,
      },
      jobTitle: updatedApplication.job.title,
      hr: {
        name: updatedApplication.job.postedBy.name,
        company: updatedApplication.job.postedBy.company.name,
      },
    };

    const emailTemplate = createTemplate(data, 'applicationStatusUpdate');
    await emailService(emailData, emailTemplate);

    console.log('Email Sent Successfully');

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
