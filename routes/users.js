const userRouter = require('express').Router();
const auth = require('../middleware/auth');

const {
  getUser,
  getUsers,
} = require('../controllers/usersController');

userRouter.get('/', auth, getUsers);
userRouter.get('/:id', auth, getUser);

module.exports = userRouter;
