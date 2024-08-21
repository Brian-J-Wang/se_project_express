const user = require('../models/user');
const { Error500, Error400, Error404 } = require('../utils/error');

module.exports.getUsers = (req, res) => {
  user.find({})
  .then(users => {
    res.send(users);
  })
  .catch(() => {
    Error500(res);
  });
}

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  user.findById(userId)
  .orFail(() => {
    const error = Error("Requested resource not found");
    error.name = "MissingResource";
    throw error;
  })
  .then((userData) => {
    res.send(userData);
  })
  .catch(err => {
    if (err.name === 'CastError') {
      Error400(res);
    } else if (err.name === "MissingResource") {
      Error404(res);
    }
    else {
      Error500(res);
    }
  })
}

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  user.create({
    name,
    avatar
  }).then((userData) => {
    res.status(200);
    res.send(userData);
  })
  .catch(err => {
    if (err.name === 'ValidationError') {
      Error400(res);
    } else {
      Error500(res);
    }
  });
}