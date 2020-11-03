const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  getUsers,
} = require('../controllers/usersController');

userRouter.get('/', getUsers);
userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum(),
  }),
}), getUser);

module.exports = userRouter;
