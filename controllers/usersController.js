const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Iternal server error' }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.staus(200).send({ data: user });
      }
      res.status(404).send({ message: 'User ID not found' });
    })
    .catch(() => res.status(500).send({ message: 'Iternal server error' }));
};

const addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    }).catch((e) => {
      console.error(e);
      // res.status(500).send({ message: 'oops something went wrong' });
    });
};
module.exports = {
  getUsers,
  getUser,
  addUser,
};
