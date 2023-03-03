const BaseError = require('./BaseError');

/**
 * Custom class Error to rendered Api Error to client
 * @constructor
 * @param {string} name - the name of the error
 * @param {string} [httpCode="500"] - the code http rendered to client side
 * @param {string} [message="Internal Server Error"] - message send to the client
 * @throws {string} Internal Server Error
 * @throws {string} Not authorize
 * @throws {string} At least one mandatory data in error
 * @throws {string} User already exist
 * @throws {string} Schedule is full
 */
class ApiError extends BaseError {
  constructor(name, httpCode, message = 'Internal Server Error') {
    super(name, httpCode, message);
    this.httpCode = httpCode || this.httpStatusCode.INTERNAL_SERVER;
  }
}

module.exports = ApiError;
