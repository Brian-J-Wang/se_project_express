const userRouter = require('express').Router();
const {getCurrentUser, updateUserProfile } = require('../controllers/userController');

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', updateUserProfile);

module.exports = userRouter;