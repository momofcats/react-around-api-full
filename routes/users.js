const userRouter = require('express').Router();
const auth = require('../middleware/auth');

const {
  getUser,
  getUsers,
  addUser,
  loginUser,
} = require('../controllers/usersController');

userRouter.get('/', auth, getUsers);
userRouter.get('/:id', auth, getUser);
// userRouter.post('/', addUser);
userRouter.post('/signin', loginUser);
userRouter.post('/signup', addUser);

module.exports = userRouter;
