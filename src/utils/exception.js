class Exception extends Error {
  constructor(statusCode, message, stack) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = Exception;
