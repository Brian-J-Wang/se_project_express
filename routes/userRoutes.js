const userRouter = require('express').Router();
const {getCurrentUser, updateUserProfile } = require('../controllers/userController');
const { authorize } = require('../middlewares/auth');
const { validateUserInfo: ValidateUserInfo, validateUserAccess: ValidateUserAccess } = require('../middlewares/validation');

userRouter.use(authorize);

userRouter.get('/me', ValidateUserAccess , getCurrentUser);

userRouter.patch('/me', ValidateUserInfo , updateUserProfile);

module.exports = userRouter;