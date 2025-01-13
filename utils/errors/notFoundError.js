class NotFoundError extends Error {
  constructor(message) {
    super(message ?? "Not Found Error");
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;