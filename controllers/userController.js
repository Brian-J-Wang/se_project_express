const mongoose = require('mongoose');
const user = require('../models/user');
const { Error500 } = require('../utils/error');

module.exports.getUsers = (req, res) => {
  user.find({})
  .then(users => {
    res.send(users);
  })
  .catch(err => {
    console.log(err);
    Error500(res);
  });
}

module.exports.getUser = (req, res) => {
  user.find({"_id" : mongoose.Schema.Types.ObjectId(req.params.id)})
  .orFail(() => {
    console.error('id is not found');
  })
  .then((user) => {
    res.send(user);
  })
  .catch(err => {
    console.error(err);
    Error500(res);
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
    console.error(err);
    Error500(res);
  });
}