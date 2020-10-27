const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middleware/auth');

const {
  getUser,
  getUsers,
} = require('../controllers/usersController');

userRouter.get('/', auth, celebrate({
  authorization: Joi.string().required(),
}), getUsers);
userRouter.get('/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
}), getUser);

module.exports = userRouter;
