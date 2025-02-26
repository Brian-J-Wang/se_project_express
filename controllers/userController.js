const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const ConflictError = require('../utils/errors/conflictError');
const UnauthorizedError = require('../utils/errors/unauthorizedError');
const BadRequestError = require('../utils/errors/badRequestError');
const NotFoundError = require('../utils/errors/notFoundError');

module.exports.createUser = (req, res, next)  => {
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
      next(new ConflictError("MongoDb Server Error"))
    } else {
      next(new BadRequestError("Bad Request"));
    }
  });
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if ( !email || !password ) {
    next(new BadRequestError());
    return;
  }

  user.findUserByCredentials(email, password)
  .then((userId) => {
    const token = jwt.sign({ _id: userId }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.send({ token });
  })
  .catch((err) => {
    if (err.message === 'Incorrect email or password') {
      next(new UnauthorizedError(err.message));
    } else {
      next(err);
    }
  })
}

module.exports.getCurrentUser = (req, res, next)  => {
  user.findOne({ _id: req.user })
  .orFail(new Error("User not Found"))
  .then(userData => {
    res.send(userData);
  })
  .catch(err => {
    if (err.message === "User not Found") {
      next(new NotFoundError(err.message));
    } else {
      next(err);
    }
  });
}

module.exports.updateUserProfile = (req, res, next)  => {
  const { name, avatar } = req.body;
  user.findByIdAndUpdate(req.user,
    {
      name,
      avatar
    }, {
      new: true,
      runValidators: true
    }
  ).orFail(new Error("User not Found"))
  .then(userData => res.send(userData)
  )
  .catch((err) => {
    if (err.name === "ValidationError") {
      next(new BadRequestError(err.message));
    } else if (err.message === "User not Found") {
      next(new NotFoundError(err.message));
    } else {
      next(err);
    }
  })
}