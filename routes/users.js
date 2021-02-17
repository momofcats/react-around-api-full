const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  getUsers,
  updateAvatar,
  updateUserInfo,
} = require('../controllers/usersController');

userRouter.get('/', getUsers);
userRouter.get('/me', getUser);

userRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required().uri(),
    }),
  }),
  updateAvatar,
);

userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserInfo,
);

module.exports = userRouter;
