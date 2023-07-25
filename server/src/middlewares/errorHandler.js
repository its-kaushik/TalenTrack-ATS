const BaseError = require('../errors/baseError');
const { responseHandler } = require('../utils/responseHandler');

function logError(err) {
  console.error(err);
}

function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

function returnError(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    data: null,
  });
  //responseHandler(res, null, err.message, err.statusCode || 500);
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
