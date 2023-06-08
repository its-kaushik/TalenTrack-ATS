const path = require('path');
const statuscodes = require('http-status');

const User = require('../../models/user.mongo');

async function uploadResumeHttp(req, res, next) {
  try {
    const uploadedFile = req.file;
    const filePath = uploadedFile.path;
    const resumeTitle = req.body.title;

    const resume = {
      title: resumeTitle,
      fileURL: filePath,
    };

    const user = await User.findById(req.user.id);
    user.resumes.push(resume);
    user.save();

    res.json({
      message: 'Resume uploaded successfully!',
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = uploadResumeHttp;
