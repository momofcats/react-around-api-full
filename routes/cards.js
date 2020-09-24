const cardsRouter = require('express').Router();
const { getCards, createCard } = require('../controllers/cardsController');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);

module.exports = cardsRouter;
