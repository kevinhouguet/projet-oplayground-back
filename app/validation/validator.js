const UserInputError = require('../errors/UserInputError');

function validate(schema, dataSource) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[dataSource]);
      next();
    } catch (error) {
      next(new UserInputError(error.details[0].message));
    }
  };
}

module.exports = validate;
