const userRouter = require('express').Router();
const {getCurrentUser, updateUserProfile } = require('../controllers/userController');
const { authorize } = require('../middlewares/auth');
const { validateUpdateUserInfo } = require('../middlewares/validation');

userRouter.use(authorize);

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', validateUpdateUserInfo, updateUserProfile);

module.exports = userRouter;