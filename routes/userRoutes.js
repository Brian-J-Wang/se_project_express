const userRouter = require('express').Router();
const authorize = require('../middlewares/auth').authorize;
const {getUsers, getUser, createUser, getCurrentUser, updateUserProfile } = require('../controllers/userController');


userRouter.use(authorize);

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', updateUserProfile);

module.exports = userRouter;