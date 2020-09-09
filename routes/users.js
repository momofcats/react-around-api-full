const userRouter = require('express').Router();

const path = require('path');

const fs = require('fs').promises;

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getDataFromFile = (pathToFile) => fs.readFile(pathToFile, { encoding: 'utf8' })
  .then((data) => JSON.parse(data))
  .catch((err) => console.log(err));

const getUsers = (req, res) => getDataFromFile(dataPath).then((users) => res.send(users));

userRouter.get('/users', getUsers);

module.exports = userRouter;
