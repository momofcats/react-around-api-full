const cardsRouter = require('express').Router();
const getCards = require('../controllers/cardsController');

cardsRouter.get('/', getCards);

module.exports = cardsRouter;
