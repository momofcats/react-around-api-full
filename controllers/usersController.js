const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
  STATUS_CODE_UNAUTHORIZED,
  STATUS_CODE_CREATED,
  STATUS_CODE_FORBIDDEN,
} = require('../utils/statusCodes');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const ForbiddenError = require('../errors/forbidden-err');

const SALT = 10;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        throw new NotFoundError('Users were not found');
      }
      return res.status(STATUS_CODE_OK).send({ data: users });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user with matching ID found');
      }
      return res.status(STATUS_CODE_OK).send({ data: user });
    })
    .catch(next);
};

const addUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Email or password should not be empty');
  }
  return User.findOne({ email })
    .then((admin) => {
      if (admin) {
        throw new ForbiddenError('User with this email already exists');
      }
      return bcrypt.hash(password, SALT)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then((user) => res.status(STATUS_CODE_CREATED).send({ data: user }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError(err.message);
          }
        });
    })
    .catch(next);
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
