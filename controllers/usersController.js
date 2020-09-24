const User = require('../models/user');

const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_INTERNAL_SERVER_ERROR = 500;
const STATUS_CODE_OK = 200;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        return res.status(STATUS_CODE_NOT_FOUND).send({ message: 'Users were not found' });
      }
      return res.status(STATUS_CODE_OK).send({ data: users });
    })
    .catch(() => res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Iternal server error' }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(STATUS_CODE_NOT_FOUND).send({ message: 'User is not found' });
      }
      return res.status(STATUS_CODE_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(STATUS_CODE_NOT_FOUND).send({ message: 'User is not found' });
      }
      return res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Iternal server error' });
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
      return res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: 'oops something went wrong' });
    });
};
module.exports = {
  getUsers,
  getUser,
  addUser,
};
