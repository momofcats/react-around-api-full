const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Iternal server error' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  //console.log(req.user._id);
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    }).catch((e) => {
      console.error(e);
    });
};

module.exports = { getCards, createCard };
