const jwt = require('jsonwebtoken');

const BaseError = require('../errors/baseError');
const permissions = require('../permissions');

function isAuthenticated(req, res, next) {
  const token = req.headers.accesstoken;

  if (!token) {
    return next(new BaseError('You are not authenticated!', 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new BaseError('Token is not valid!', 403));

    req.user = user;
    next();
  });
}

function isAuthorized(...requiredPermissions) {
  return (req, res, next) => {
    const role = req.user.role;

    const givenPermissions = permissions[role];

    for (const requiredPermission of requiredPermissions) {
      if (!givenPermissions.includes(requiredPermission))
        return next(new BaseError('You are not authorized!', 403));
    }

    next();
  };
}

module.exports = {
  isAuthenticated,
  isAuthorized,
};
