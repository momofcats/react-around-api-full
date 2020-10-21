const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Wrong email format',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    // required: true,
    // minlength: 2,
    // maxlength: 30,
  },
  about: {
    type: String,
    // required: true,
    // minlength: 2,
    // maxlength: 30,
  },
  avatar: {
    type: String,
    // required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Invalid Url',
    },
  },

}, { versionKey: false });
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
