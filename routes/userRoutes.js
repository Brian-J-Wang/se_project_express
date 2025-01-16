const userRouter = require('express').Router();
const {getCurrentUser, updateUserProfile } = require('../controllers/userController');
const { authorize } = require('../middlewares/auth');

userRouter.use(authorize);

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', updateUserProfile);

module.exports = userRouter;