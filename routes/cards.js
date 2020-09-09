const cardsRouter = require('express').Router();

const path = require('path');

const fs = require('fs').promises;

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getDataFromFile = (pathToFile) => fs.readFile(pathToFile, { encoding: 'utf8' })
  .then((data) => JSON.parse(data));

const getCards = (req, res) => getDataFromFile(dataPath)
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(404).send({ message: 'Can\'t read the file' }));

cardsRouter.get('/', getCards);

module.exports = cardsRouter;
