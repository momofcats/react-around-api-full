const path = require('path');
const getDataFromFile = require('../helpers/getDataFromFile');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => getDataFromFile(dataPath)
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(404).send({ message: 'Can\'t read the file' }));

module.exports = getCards;
