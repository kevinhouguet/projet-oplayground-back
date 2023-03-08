const BaseError = require('./BaseError');

class ApiUnauthorizeError extends BaseError {
  constructor(message = 'Access Unauthorize') {
    super(message);
    this.name = 'UnauthorizeError';
    this.httpCode = this.httpStatusCode.UNAUTHORIZE;
  }
}

module.exports = ApiUnauthorizeError;
