const UserInputError = require('../errors/UserInputError');

function validate(schema, dataSource) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[dataSource]);
      next();
    } catch (error) {
      console.log(req.body);
      console.error(error.details[0].message);
      next(new UserInputError());
    }
  };
}

module.exports = validate;
