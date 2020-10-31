const express = require('express');
require('dotenv').config();
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { loginUser, addUser } = require('./controllers/usersController');
const { requestLogger, errorLogger } = require('./middleware/logger');

const jsonParser = bodyParser.json();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const auth = require('./middleware/auth');

app.use(cors());
app.use(jsonParser);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), addUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), loginUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'an error occured on the server'
      : message,
  });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
