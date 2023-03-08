const BaseError = require('./BaseError');

class HttpForbiddenError extends BaseError {
  constructor(message = 'Access Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
    this.httpCode = this.httpStatusCode.FORBIDDEN;
  }
}

module.exports = HttpForbiddenError;
