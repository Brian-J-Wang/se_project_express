const index = require('express').Router();
const { login, createUser } = require('../controllers/userController');

index.post('/signin', login);

index.post('/signup', createUser);

module.exports = index;