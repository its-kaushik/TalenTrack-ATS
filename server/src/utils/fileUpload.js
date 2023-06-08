const multer = require('multer');
const path = require('path');
const statuscodes = require('http-status');

const fileExtensions = require('./fileExtensions');
const BaseError = require('../errors/baseError');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + fileExtensions[file.mimetype]
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    cb(null, true);
  } else {
    cb(
      new BaseError(
        'Only PDF and Microsoft Word files are allowed',
        statuscodes.BAD_REQUEST
      ),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
