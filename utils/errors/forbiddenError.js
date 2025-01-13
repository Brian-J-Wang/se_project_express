class ForbiddenError extends Error {
  constructor(message) {
    super(message ?? "Forbidden Error");
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;