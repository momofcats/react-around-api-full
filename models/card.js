const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'author',
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);