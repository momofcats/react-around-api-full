const userRouter = require('express').Router();

const {
  getUser,
  getUsers,
  addUser,
  loginUser,
} = require('../controllers/usersController');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
// userRouter.post('/', addUser);
userRouter.post('/signin', loginUser);
userRouter.post('/signup', addUser);

module.exports = userRouter;
