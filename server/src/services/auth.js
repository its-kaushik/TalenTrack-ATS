const statuscodes = require('http-status');
const jwt = require('jsonwebtoken');

const BaseError = require('../errors/baseError');
const roles = require('../config/roles');

function isAuthenticated(req, res, next) {
  const token = req.headers.accesstoken;

  if (!token) {
    return next(
      new BaseError('You are not authenticated', statuscodes.UNAUTHORIZED)
    );
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return next(new BaseError('Token is not valid', statuscodes.FORBIDDEN));

    req.user = user;
    next();
  });
}

function isAuthorized(...requestedResources) {
  return (req, res, next) => {
    const role = req.user.role;

    const permissions = roles[role];

    for (const requestedResource of requestedResources) {
      if (!permissions.includes(requestedResource))
        return next(
          new BaseError('You are not authorized!', statuscodes.FORBIDDEN)
        );
    }

    next();
  };
}

module.exports = {
  isAuthenticated,
  isAuthorized,
};
