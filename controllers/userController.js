const mongoose = require('mongoose');
const user = require('../models/user');
const { Error500, Error400, Error404 } = require('../utils/error');

module.exports.getUsers = (req, res) => {
  user.find({})
  .then(users => {
    res.send(users);
  })
  .catch(err => {
    Error500(res, err);
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
  .then((user) => {
    res.send(user);
  })
  .catch(err => {
    if (err.name === 'CastError') {
      Error400(res, err);
    } else if (err.name === "MissingResource") {
      Error404(res, err);
    }
    else {
      Error500(res, err);
    }
  })
}

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  user.create({
    name: name,
    avatar: avatar
  }).then((user) => {
    res.status(200);
    res.send(user);
  })
  .catch(err => {
    if (err.name === 'ValidationError') {
      Error400(res, err);
    } else {
      Error500(res, err);
    }
  });
}