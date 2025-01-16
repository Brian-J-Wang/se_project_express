const jwt = require('jsonwebtoken');
const { Error401 } = require('../utils/error');
const {secret} = require('../utils/config');
const UnauthorizedError = require('../utils/errors/unauthorizedError');

module.exports.authorize = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    Error401(res, 'Authorization Required');
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    next(new UnauthorizedError("Bearer Token missing"));
  }

  req.user = payload;
  next();
}