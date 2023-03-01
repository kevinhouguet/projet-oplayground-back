class BaseError extends Error {
  constructor(name, httpCode, message) {
    super(message);
    this.httpStatusCode = {
      OK: 200,
      BAD_REQUEST: 400,
      NOT_FOUND: 404,
      INTERNAL_SERVER: 500,
    };

    this.name = name;
    this.httpCode = httpCode;
  }
}

module.exports = BaseError;
