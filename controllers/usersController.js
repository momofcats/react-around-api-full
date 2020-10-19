const User = require('../models/user');
const {
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
} = require('../utils/statusCodes');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        return res.status(STATUS_CODE_NOT_FOUND).send({ message: 'Users were not found' });
      }
      return res.status(STATUS_CODE_OK).send({ data: users });
    })
    .catch(() => res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(STATUS_CODE_NOT_FOUND).send({ message: 'User Id is not found' });
      }
      return res.status(STATUS_CODE_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(STATUS_CODE_NOT_FOUND).send({ message: 'User Id is not found' });
      }
      return res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    });
};

const addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(STATUS_CODE_OK).send({ data: user });
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_CODE_BAD_REQUEST).send({ message: err.message });
      }
      return res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    });
};
module.exports = {
  getUsers,
  getUser,
  addUser,
};
