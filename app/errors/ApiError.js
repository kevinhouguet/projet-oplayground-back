const BaseError = require('./BaseError');

class ApiError extends BaseError {
  constructor(name, httpCode, message = 'Internal Server Error') {
    super(name, httpCode, message);
    this.httpCode = httpCode || this.httpStatusCode.INTERNAL_SERVER;
  }
}

module.exports = ApiError;
