const Application = require('../../models/application.mongo');
const BaseError = require('../../errors/baseError');
const { responseHandler } = require('../../utils/responseHandler');
const SearchQueryBuilder = require('../../utils/searchQueryBuilder');
const { default: mongoose } = require('mongoose');
const emailService = require('../../services/email');
const createTemplate = require('../../utils/templateGenerator');

async function createApplication(req, res, next) {
  try {
    const checkApplication = await Application.findOne({
      job: req.body.job,
      applicant: req.user.id,
    });

    if (checkApplication) throw new BaseError('Already Applied!', 409);

    const application = new Application({
      ...req.body,
      applicant: req.user.id,
    });

    await application.save();

    responseHandler(res, application, 'Applied Successfully!', 201);
  } catch (err) {
    next(err);
  }
}

async function getApplicationsByUser(req, res, next) {
  try {
    req.query.applicant = req.user.id;

    const getApplications = new SearchQueryBuilder(
      Application.find(),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const applications = await getApplications.query
      .populate({
        path: 'job',
        select: 'title hr description salaryRange',
        populate: {
          path: 'hr',
          select: 'company',
        },
      })
      .populate({
        path: 'applicant',
        select: 'name email resume',
      });

    responseHandler(res, applications);
  } catch (err) {
    next(err);
  }
}

async function getAllApplications(req, res, next) {
  try {
    const getApplications = new SearchQueryBuilder(
      Application.find(),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const applications = await getApplications.query
      .populate({
        path: 'job',
        select: 'title hr description salaryRange',
        populate: {
          path: 'hr',
          select: 'company',
        },
      })
      .populate({
        path: 'applicant',
        select: 'name email resume',
      });

    responseHandler(res, applications);
  } catch (err) {
    next(err);
  }
}

async function getApplicationsGroupedByStage(req, res, next) {
  try {
    //TODO Update code to populate only selected fields.

    const result = await Application.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'applicant',
          foreignField: '_id',
          as: 'applicant',
        },
      },
      {
        $unwind: '$applicant',
      },
      {
        $match: {
          job: new mongoose.Types.ObjectId(req.query.job),
          //round: { $ne: -1 },
        },
      },
      {
        $group: {
          _id: '$round',
          applications: { $push: '$$ROOT' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    responseHandler(res, result);
  } catch (err) {
    next(err);
  }
}

async function deleteApplicationByID(req, res, next) {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) throw new BaseError('Application Not Found!', 404);

    //TODO making sure user is deleting his application only.
    //if (application.applicant !== req.user.id)
    //throw new BaseError("You don't have permission to do this!", 401);

    await Application.findByIdAndDelete(req.params.id);

    responseHandler(res, null, 'Application Withdrawn Successfully!');
  } catch (err) {
    next(err);
  }
}

async function moveToNextStage(req, res, next) {
  try {
    const application = await Application.findById(req.params.id)
      .populate({
        path: 'job',
        select: 'totalRounds title hr',
        populate: {
          path: 'hr',
          select: '_id name email company',
        },
      })
      .populate({
        path: 'applicant',
        select: '_id name email',
      });

    if (!application) throw new BaseError('Application Not Found', 404);

    const totalRounds = application.job.totalRounds;
    const currRound = application.round;

    if (currRound > totalRounds) {
      throw new BaseError('Application already selected', 400);
    } else if (currRound === totalRounds) {
      application.status = 'accepted';
      application.lastround = 'accepted';
      application.round = currRound + 1;

      await application.save();
    } else {
      application.status = 'in-progress';
      application.lastround = `round-${currRound}`;
      application.round = currRound + 1;

      await application.save();
    }

    const emailData = {
      to: application.applicant.email,
      subject: 'Applicaition Status Update',
    };

    const data = {
      applicant: {
        name: application.applicant.name,
      },
      jobTitle: application.job.title,
      hr: {
        name: application.job.hr.name,
        company: application.job.hr.name,
      },
    };

    const emailTemplate = createTemplate(data, 'applicationStatusUpdate');

    await emailService(emailData, emailTemplate);

    console.log('email sent');

    responseHandler(res, application);
  } catch (err) {
    next(err);
  }
}

async function rejectApplication(req, res, next) {
  try {
    const application = await Application.findById(req.params.id)
      .populate({
        path: 'job',
        select: 'totalRounds title hr',
        populate: {
          path: 'hr',
          select: '_id name email company',
        },
      })
      .populate({
        path: 'applicant',
        select: '_id name email',
      });

    if (!application) throw new BaseError('Application Not Found', 404);

    if (application.status === 'rejected')
      throw new BaseError('Application already rejeted', 400);

    application.status = 'rejected';

    const roundNumber = application.round;

    application.lastround = `round-${roundNumber}`;
    application.round = -1;

    await application.save();

    //TODO Send email notifying of update.

    const emailData = {
      to: application.applicant.email,
      subject: 'Applicaition Status Update',
    };

    const data = {
      applicant: {
        name: application.applicant.name,
      },
      jobTitle: application.job.title,
      hr: {
        name: application.job.hr.name,
        company: application.job.hr.name,
      },
    };

    const emailTemplate = createTemplate(data, 'applicationStatusUpdate');

    await emailService(emailData, emailTemplate);

    console.log('email sent');

    responseHandler(res, application, 'Application rejected successfully!');
  } catch (err) {
    next(err);
  }
}

async function updateApplication(req, res, next) {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    responseHandler(res, application);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createApplication,
  getApplicationsByUser,
  getAllApplications,
  getApplicationsGroupedByStage,
  deleteApplicationByID,
  moveToNextStage,
  rejectApplication,
  updateApplication,
};
