const index = require('express').Router();
const { login, createUser } = require('../controllers/userController');
const { validateUserInfo, validateLogIn } = require('../middlewares/validation');

index.post('/signin', validateLogIn, login);

index.post('/signup', validateUserInfo, createUser);

module.exports = index;