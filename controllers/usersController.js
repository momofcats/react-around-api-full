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
  STATUS_CODE_FORBIDDEN,
} = require('../utils/statusCodes');

const SALT = 10;

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
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    return res.status(STATUS_CODE_BAD_REQUEST)
      .send({ message: 'email or password should not be empty' });
  }
  return User.findOne({ email })
    .then((admin) => {
      if (admin) {
        return res.status(STATUS_CODE_FORBIDDEN).send({ message: 'User with this email already exists' });
      }
      return bcrypt.hash(password, SALT)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then((user) => res.status(STATUS_CODE_CREATED).send({ data: user }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return res.status(STATUS_CODE_BAD_REQUEST).send({ message: err.message });
          }
          return res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
        });
    });
};

const loginUser = (req, res) => {
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
  loginUser,
};
