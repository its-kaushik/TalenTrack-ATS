const jwt = require('jsonwebtoken');

const BaseError = require('../errors/baseError');

function isAuthenticated(req, res, next) {
  const token = req.headers.accesstoken;

  if (!token) {
    return next(new BaseError('You are not authenticated', 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new BaseError('Token is not valid', 403));

    req.user = user;
    next();
  });
}

module.exports = {
  isAuthenticated,
};
