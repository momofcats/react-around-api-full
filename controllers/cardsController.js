const Card = require('../models/card');
const {
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
} = require('../utils/statusCodes');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        return res.status(STATUS_CODE_NOT_FOUND).send({ message: 'Cards were not found' });
      }
      return res.status(STATUS_CODE_OK).send({ data: cards });
    })
    .catch(() => res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(STATUS_CODE_OK).send({ data: card });
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_CODE_BAD_REQUEST).send({ message: err.message });
      }
      return res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(STATUS_CODE_NOT_FOUND).send({ message: 'Card Id is not found' });
      }
      return res.status(STATUS_CODE_OK).send({ data: card });
    }).catch((err) => {
      if (err.name === 'CastError') {
        return res.status(STATUS_CODE_NOT_FOUND).send({ message: 'Card Id is not found' });
      }
      return res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    });
};

module.exports = { getCards, createCard, deleteCard };
