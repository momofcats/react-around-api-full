const userRouter = require('express').Router();

const { getUser, getUsers, addUser } = require('../controllers/usersController');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', addUser);

module.exports = userRouter;
