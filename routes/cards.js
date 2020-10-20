const cardsRouter = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cardsController');
const auth = require('../middleware/auth');

cardsRouter.get('/', auth, getCards);
cardsRouter.post('/', auth, createCard);
cardsRouter.delete('/:cardId', auth, deleteCard);

module.exports = cardsRouter;
