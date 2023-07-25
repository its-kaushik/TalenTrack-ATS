const multer = require('multer');

const fileExtensions = require('./fileExtensions');
const BaseError = require('../errors/baseError');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data/uploads/');
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
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(
      new BaseError(
        'Only PDF, Microsoft Word, jpeg, png files are allowed',
        400
      ),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
