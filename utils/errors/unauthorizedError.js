class UnauthorizedError extends Error {
  constructor(message) {
    super(message ?? "Unauthorized Error");
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;