const BaseError = require('./BaseError');

/**
 * Custom class NotFoundError
 * @constructor
 * @param {string} name - the name of the error
 * @param {string} httpCode - the code http rendered to client side
 * @param {string} [message="Ressource not found"] - message send to the client
 */
class NotFoundError extends BaseError {
  constructor(name, httpCode, message = 'Ressource not found') {
    super(name, httpCode, message);
    this.name = 'NotFoundError';
    this.httpCode = this.httpStatusCode.NOT_FOUND;
  }
}

module.exports = NotFoundError;
