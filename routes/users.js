const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middleware/auth');

const {
  getUser,
  getUsers,
} = require('../controllers/usersController');

userRouter.get('/', auth, getUsers);
userRouter.get('/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUser);

module.exports = userRouter;
