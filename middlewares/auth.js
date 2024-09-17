const jwt = require('jsonwebtoken');
const { Error401 } = require('../utils/error');
const {secret} = require('../utils/config');

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
    Error401(res, 'Authorization Required');
  }

  req.user = payload;
  next();
}