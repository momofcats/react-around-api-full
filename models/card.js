const mongoose = require('mongoose');

const cardSchema = new mongoose.Shchema({
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
        return /^https?:\/\/[\w/.-]+#*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URl`,
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
});

module.exports = mongoose.model('card', cardSchema);
