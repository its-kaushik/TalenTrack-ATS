const statuscodes = require('http-status');

const JobPost = require('../../models/jobPost.mongo');
const SearchQueryBuilder = require('../../utils/searchQueryBuilder');

async function createJobPostHttp(req, res, next) {
  try {
    const newJobPost = new JobPost({
      ...req.body,
      postedBy: req.user.id,
    });

    await newJobPost.save();

    res.status(statuscodes.CREATED).json({
      status: statuscodes.CREATED,
      message: 'Job Post Created Successfully!.',
    });
  } catch (err) {
    next(err);
  }
}

async function getAllJobPostsHttp(req, res, next) {
  try {
    const getJobPosts = new SearchQueryBuilder(JobPost.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const jobPosts = await getJobPosts.query.populate({
      path: 'postedBy',
      select: 'name email',
      populate: {
        path: 'companyID',
        select: 'name',
      },
    }); //Query gets executed here.

    res.status(statuscodes.OK).json({
      status: statuscodes.OK,
      results: jobPosts.length,
      data: {
        jobPosts,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function getJobPostHttp(req, res, next) {
  try {
    const jobPost = await JobPost.findById(req.params.id).populate({
      path: 'postedBy',
      select: 'name email',
      populate: {
        path: 'companyID',
        select: 'name',
      },
    });

    res.status(statuscodes.OK).json({
      status: statuscodes.OK,
      data: {
        jobPost,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function updateJobPostHttp(req, res, next) {
  try {
    const jobPost = await JobPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(statuscodes.OK).json({
      status: statuscodes.OK,
      data: {
        jobPost,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function deleteJobPostHttp(req, res, next) {
  try {
    await JobPost.findByIdAndDelete(req.params.id);

    res.status(statuscodes.OK).json({
      status: statuscodes.OK,
      message: 'Job Post Deleted Successfully',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createJobPostHttp,
  getAllJobPostsHttp,
  getJobPostHttp,
  updateJobPostHttp,
  deleteJobPostHttp,
};
