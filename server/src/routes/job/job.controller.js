const BaseError = require('../../errors/baseError');
const Job = require('../../models/job.mongo');
const { responseHandler } = require('../../utils/responseHandler');
const SearchQueryBuilder = require('../../utils/searchQueryBuilder');

async function createJob(req, res, next) {
  try {
    const job = new Job({
      ...req.body,
      hr: req.user.id,
    });

    await job.save();

    responseHandler(res, job, 'Job created successfully!', 201);
  } catch (err) {
    next(err);
  }
}

async function getAllJobs(req, res, next) {
  try {
    const getJobs = new SearchQueryBuilder(Job.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const jobs = await getJobs.query.populate({
      path: 'hr',
      select: 'name email company',
    });

    responseHandler(res, jobs);
  } catch (err) {
    next(err);
  }
}

async function getSelfPostedJobs(req, res, next) {
  try {
    req.query.hr = req.user.id;

    const getJobs = new SearchQueryBuilder(Job.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const jobs = await getJobs.query.populate({
      path: 'hr',
      select: 'name email company',
    });

    responseHandler(res, jobs);
  } catch (err) {
    next(err);
  }
}

async function getJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id).populate({
      path: 'hr',
      select: 'name email company',
    });
    if (!job) throw new BaseError('No job found!', 404);

    responseHandler(res, job);
  } catch (err) {
    next(err);
  }
}

async function updateJobByID(req, res, next) {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    responseHandler(res, job);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createJob,
  getAllJobs,
  getSelfPostedJobs,
  getJob,
  updateJobByID,
};
