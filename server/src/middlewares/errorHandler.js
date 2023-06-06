const statuscode = require('http-status');

const BaseError = require('../errors/baseError');

function logError(err) {
  console.error(err);
}

function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

function returnError(err, req, res, next) {
  res.status(err.statusCode || statuscode.INTERNAL_SERVER_ERROR).json({
    message: err.message,
  });
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError,
};
