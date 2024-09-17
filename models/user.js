const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'You must enter a valid Email'
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
});

userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {

      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
      .then(match => {
        if (!match) {
          return Promise.reject(new Error('Incorrect email or password'));
        }

        return user._id.valueOf();
      });
    })
}

module.exports = mongoose.model('user', userSchema);