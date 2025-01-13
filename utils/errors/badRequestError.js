class BadRequestError extends Error {
  constructor(message) {
    super(message ?? "Bad Request Error");
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;