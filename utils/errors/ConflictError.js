class ConflictError extends Error {
  constructor(message) {
    super(message ?? "Conflicting Error");
    this.statusCode = 409;
  }
}

module.exports = ConflictError;