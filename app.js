const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('./utils/rateLimit');
const mainRouter = require('./routes/index');

const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const jsonParser = bodyParser.json();

const { PORT = 3000, MONGODB_URI = 'mongodb://localhost:27017/aroundb', NODE_ENV } = process.env;
const NotFoundError = require('./errors/not-found-err');
const errorMessages = require('./utils/errorMessages');

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGODB_URI : 'mongodb+srv://ykhilko:Kotiki&murmotiki@aroundb.ydnqx.mongodb.net/aroundb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(requestLogger);
app.use(jsonParser);
app.use('/', mainRouter);

app.use(() => {
  throw new NotFoundError(errorMessages.notFoundResource);
});
app.use(errorLogger);
app.use(helmet());
app.use(limiter);
app.use(errorHandler);
app.listen(PORT);
