const BaseError = require('./BaseError');

class ApiError extends BaseError {
  constructor(name, httpCode, message = 'Internal Server Error') {
    super(name, httpCode, message);
    this.httpCode = this.httpStatusCode.INTERNAL_SERVER || httpCode;
  }
}

module.exports = ApiError;
