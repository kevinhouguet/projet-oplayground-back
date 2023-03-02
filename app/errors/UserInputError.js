const BaseError = require('./BaseError');

class UserInputError extends BaseError {
  constructor() {
    super();
    this.name = 'UserInputError';
    this.httpCode = 400;
    this.message = 'The data provided are invalid';
  }
}

module.exports = UserInputError;
