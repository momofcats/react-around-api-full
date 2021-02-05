const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
} = require('../utils/statusCodes');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const errorMessages = require('../utils/errorMessages');
const ConflictError = require('../errors/conflict-err');

const SALT = 10;
const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        throw new NotFoundError(errorMessages.notFoundUsers);
      }
      return res.status(STATUS_CODE_OK).send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.noMatchingId);
      }
      return res.status(STATUS_CODE_OK).send(user);
    })
    .catch(next);
};

const addUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    throw new BadRequestError(errorMessages.emptyCredentials);
  }
  return User.findOne({ email })
    .then((admin) => {
      if (admin) {
        throw new ConflictError(errorMessages.existingUser);
      }
      return bcrypt.hash(password, SALT)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then((user) => res.status(STATUS_CODE_CREATED).send(user));
    })
    .catch(next);
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(errorMessages.emptyCredentials);
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
      res.status(STATUS_CODE_CREATED)
        .send({ token });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  if (!avatar) {
    throw new BadRequestError(errorMessages.invalidUrl);
  }
  return User.findByIdAndUpdate(userId, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.noMatchingId);
      }
      return res.status(STATUS_CODE_OK).send(user);
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  if (!name || !about) {
    throw new BadRequestError(errorMessages.emptyCredentials);
  }
  return User.findByIdAndUpdate(userId, { name, about }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.noMatchingId);
      }
      return res.status(STATUS_CODE_OK).send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  loginUser,
  updateAvatar,
  updateUserInfo,
};
