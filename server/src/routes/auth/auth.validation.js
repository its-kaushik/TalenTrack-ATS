const Joi = require('joi');
const { password } = require('../../validation/custom.validation');

const rolesEnum = ['candidate', 'hr'];

const registerUser = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().lowercase().min(2).max(30).required(),
      lastName: Joi.string().lowercase().min(2).max(30),
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      role: Joi.string().valid(...rolesEnum),
      company: Joi.string().min(2),
    })
    .and('role', 'company'),
};

module.exports = {
  registerUser,
};
