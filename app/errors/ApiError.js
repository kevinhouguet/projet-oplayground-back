const BaseError = require('./BaseError');

/**
 * class ApiError
 * @constructor
 * @param {string} name - the name of the error
 *
 */
class ApiError extends BaseError {
  constructor(name, httpCode, message = 'Internal Server Error') {
    super(name, httpCode, message);
    this.httpCode = httpCode || this.httpStatusCode.INTERNAL_SERVER;
  }
}

module.exports = ApiError;
