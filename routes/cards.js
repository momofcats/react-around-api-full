const cardsRouter = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cardsController');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);

module.exports = cardsRouter;
