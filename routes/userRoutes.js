const userRouter = require('express').Router();
const {getUsers, getUser, createUser } = require('../controllers/userController.js');

userRouter.get('/', getUsers );

userRouter.get('/:userId', getUser);

userRouter.post('/', createUser);