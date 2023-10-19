const Joi = require('joi');
const pick = require('../utils/pick');
const BaseError = require('../errors/baseError');

const validate = (schema) => (req, res, next) => {
  //const validSchema = pick(schema, ['params', 'query', 'body']);
  //console.log(validSchema);
  const object = pick(req, Object.keys(schema));
  console.log(object);
  const { value, error } = Joi.compile(schema)
    .prefs({
      errors: { label: 'key' },
      abortEarly: false,
    })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');

    return next(new BaseError(errorMessage, 400));
  }

  Object.assign(req, value);

  return next();
};

module.exports = validate;
