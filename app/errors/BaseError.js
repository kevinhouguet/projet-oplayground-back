/**
 * Custom class Error to base all Error custom in same format
 * @constructor
 * @param {string} name - the name of the error
 * @param {string} httpCode - the code http rendered to client side
 * @param {string} message - message send to the client
 */

class BaseError extends Error {
  constructor(name, httpCode, message) {
    super(message);
    this.httpStatusCode = {
      OK: 200,
      BAD_REQUEST: 400,
      NOT_FOUND: 404,
      INTERNAL_SERVER: 500,
      FORBIDDEN: 403,
      UNAUTHORIZE: 401,
    };

    this.name = name;
    this.httpCode = httpCode;
  }
}

module.exports = BaseError;
