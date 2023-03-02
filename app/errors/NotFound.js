const BaseError = require('./BaseError');

class NotFoundError extends BaseError {
  constructor(name, httpCode, message = 'Ressource not found') {
    super(name, httpCode, message);
    this.name = 'NotFoundError';
    this.httpCode = this.httpStatusCode.NOT_FOUND;
  }
}

module.exports = NotFoundError;
