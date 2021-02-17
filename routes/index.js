const mainRouter = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const cardsRouter = require('./cards');
const userRouter = require('./users');
const auth = require('../middleware/auth');
const { addUser, loginUser } = require('../controllers/usersController');

mainRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), addUser);

mainRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), loginUser);

mainRouter.use('/users', auth, userRouter);
mainRouter.use('/cards', auth, cardsRouter);
mainRouter.use(errors());
module.exports = mainRouter;
