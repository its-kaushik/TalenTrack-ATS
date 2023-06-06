const statuscode = require('http-status');

const BaseError = require('./baseError');

class Api404Error extends BaseError {
  constructor(
    name,
    statusCode = statuscode.NOT_FOUND,
    description = 'Not found.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = Api404Error;
