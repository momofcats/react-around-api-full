const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: isEmail,
      message: 'is not valid email',
      //isAsync: false,
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regExp = /^https?:\/\/(www\.)?[\w/,-]+\.[\w/-]+#*$/;
        return regExp.test(v);
      },
      message: 'Invalid Url',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
