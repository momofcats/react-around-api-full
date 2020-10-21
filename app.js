const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { loginUser, addUser } = require('./controllers/usersController');

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
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
