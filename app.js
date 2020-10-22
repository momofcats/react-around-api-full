const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { loginUser, addUser } = require('./controllers/usersController');
const STATUS_CODE_INTERNAL_SERVER_ERROR = require('./utils/statusCodes');

const jsonParser = bodyParser.json();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(jsonParser);

app.post('/signup', addUser);
app.post('/signin', loginUser);
app.use('/users', userRouter);
app.use('/cards', cardsRouter);
app.use((err, req, res, next) => {
  const { statusCode = STATUS_CODE_INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === STATUS_CODE_INTERNAL_SERVER_ERROR
      ? 'an error occured on the server'
      : message,
  });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
