const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const {secret} = require('../utils/config');
const { Error500, Error400, Error404, Error409, Error401 } = require('../utils/error');

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

    res.send(token);
  })
  .catch(() => {
    Error401(res);
  })
}

module.exports.getCurrentUser = (req, res) => {
  user.findOne({ _id: req.user })
  .then(userData => {
    res.send(userData);
  })
  .catch(() => {
    Error404(res);
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
      runValidators: true,
      upsert: false
    }
  ).then(userData => {
    res.send(userData);
  })
  .catch(() => {
    Error404(res);
  })
}