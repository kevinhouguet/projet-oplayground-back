// Joi module
const UserInputError = require('../errors/UserInputError');

function validate(schema, datasource) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[datasource]);
      next();
    } catch (error) {
      next(new UserInputError(error.details[0].message));
    }
  };
}

module.exports = validate;
