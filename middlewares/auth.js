const { Error401 } = require('../utils/error');
const jwt = require('jsonwebtoken');
const secret = require('../utils/config').secret;

module.exports.authorize = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return Error401(res, 'Authorization Required');
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    console.error(err.name);
    return Error401(res, 'Authorization Required');
  }

  req.user = payload;
  next();
}