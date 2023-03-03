const BaseError = require('./BaseError');
/**
 * Custom class UserInputError
 * @constructor
 * @param {string} [name="UserInputError"] - the name of the error
 * @param {string} [httpCode=400] - the code http rendered to client side
 * @param {string} [message="The data provided are invalid"] - message send to the client
 */
class UserInputError extends BaseError {
  constructor() {
    super();
    this.name = 'UserInputError';
    this.httpCode = 400;
    this.message = 'The data provided are invalid';
  }
}

module.exports = UserInputError;
