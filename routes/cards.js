const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCard } = require('../controllers/cardsController');
const auth = require('../middleware/auth');

cardsRouter.get('/', auth, celebrate({
  authorization: Joi.required().string(),
}), getCards);
cardsRouter.post('/', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
  authorization: Joi.required().string(),
}), createCard);
cardsRouter.delete('/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  authorization: Joi.required().string(),
}), deleteCard);

module.exports = cardsRouter;
