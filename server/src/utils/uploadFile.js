const multer = require('multer');

const fileExtensions = require('./fileExtensions');
const BaseError = require('../errors/baseError');

const S3 = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const config = require('../config.js');

const s3Client = new S3.S3Client({
  region: config.AWS_BUCKET_REGION,
});

/* const storage = multer.diskStorage({
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
}); */

const storage = multerS3({
  s3: s3Client,
  bucket: config.AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
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
