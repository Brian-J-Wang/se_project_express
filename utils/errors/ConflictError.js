class ConflictError extends Error {
  constructor(message) {
    super(message ?? "Conflict Error");
    this.statusCode = 409;
  }
}

module.exports = ConflictError;