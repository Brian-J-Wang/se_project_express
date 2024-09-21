const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const {secret} = require('../utils/config');
const { Error500, Error400, Error404, Error409, Error401 } = require('../utils/error');

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
  .then( hash => user.create({
      name,
      avatar,
      email,
      password: hash
    }))
  .then((userData) => {
    const returnData = {
      _id: userData._id,
      name: userData.name,
      avatar: userData.avatar,
      email: userData.email
    }

    res.status(200);
    res.send(returnData);
  })
  .catch(err => {
    if (err.name === 'MongoServerError') {
      Error409(res);
    } else if (err.name === 'ValidationError') {
      Error400(res);
    } else {
      Error500(res);
    }
  });
}

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if ( !email || !password ) {
    Error400(res);
    return;
  }

  user.findUserByCredentials(email, password)
  .then((userId) => {
    const token = jwt.sign({ _id: userId }, secret, {
      expiresIn: "7d",
    });

    res.send({ token });
  })
  .catch((err) => {
    if (err.message === 'Incorrect email or password') {
      Error401(res, err.message);
    } else {
      Error500(res);
    }
  })
}

module.exports.getCurrentUser = (req, res) => {
  user.findOne({ _id: req.user })
  .orFail(() => Promise.reject(new Error("User not Found")))
  .then(userData => {
    res.send(userData);
  })
  .catch(err => {
    if (err.message === "User not Found") {
      Error404(res, err.message);
    } else {
      Error500(res);
    }
  });
}

module.exports.updateUserProfile = (req, res) => {
  const { name, avatar } = req.body;
  user.findByIdAndUpdate(req.user,
    {
      name,
      avatar
    }, {
      new: true,
      runValidators: true
    }
  ).orFail(() => Promise.reject(new Error("User not Found")))
  .then(userData => res.send(userData)
  )
  .catch((err) => {
    if (err.name === "ValidationError") {
      Error400(res);
    } else if (err.message === "User not Found") {
      Error404(res);
    } else {
      Error500(res);
    }
  })
}