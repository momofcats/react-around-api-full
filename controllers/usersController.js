const path = require('path');

const getDataFromFile = require('../helpers/getDataFromFile');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => getDataFromFile(dataPath)
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(404).send({ message: 'Requested resource not found' }));

const getUser = (req, res) => getDataFromFile(dataPath)
  .then((users) => users.find((user) => user._id === req.params.id))
  .then((user) => {
    if (user) {
      res.status(200).send(user);
    }
    res.status(404).send({ message: 'User ID not found' });
  })
  .catch((err) => res.status(400).send(err));

module.exports = {
  getUsers,
  getUser,
};
