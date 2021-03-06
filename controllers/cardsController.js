const Card = require('../models/card');

const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
} = require('../utils/statusCodes');

const errorMessages = require('../utils/errorMessages');
const NotFoundError = require('../errors/not-found-err');

const getCards = (req, res, next) => {
  Card.find({}).select('+owner')
    .then((cards) => {
      if (cards.length === 0) {
        throw new NotFoundError(errorMessages.notFoundCards);
      }
      return res.status(STATUS_CODE_OK).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(STATUS_CODE_CREATED).send(card);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errorMessages.noMatchingCard);
      }
      return res.status(STATUS_CODE_OK).send(card);
    }).catch(next);
};

const addLike = (req, res, next) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $push: { likes: userId } },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errorMessages.noMatchingCard);
      }
      return res.status(STATUS_CODE_OK).send(card);
    })
    .catch(next);
};

const removeLike = (req, res, next) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: userId } },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errorMessages.noMatchingCard);
      }
      return res.status(STATUS_CODE_OK).send(card);
    })
    .catch(next);
};
module.exports = {
  getCards, createCard, deleteCard, addLike, removeLike,
};
