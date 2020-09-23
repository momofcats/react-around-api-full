const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const jsonParser = bodyParser.json();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5f6ac13e2884295156e53a70',
  };

  next();
});
app.use(jsonParser);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', userRouter);
app.use('/cards', cardsRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
