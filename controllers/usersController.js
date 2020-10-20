const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
  STATUS_CODE_UNAUTHORIZED,
  STATUS_CODE_CREATED,
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
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(STATUS_CODE_CREATED).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(STATUS_CODE_BAD_REQUEST).send({ message: err.message });
      }
      return res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    });
};

const LoginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(STATUS_CODE_BAD_REQUEST)
      .send({ message: 'email or password should not be empty' });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.status(STATUS_CODE_CREATED)
        .send({ token });
    })
    .catch((err) => {
      res.status(STATUS_CODE_UNAUTHORIZED).send({ message: err.message });
    });
};
module.exports = {
  getUsers,
  getUser,
  addUser,
  LoginUser,
};
