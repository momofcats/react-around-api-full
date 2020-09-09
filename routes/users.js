const userRouter = require('express').Router();

const { getUser, getUsers } = require('../controllers/usersController');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);

module.exports = userRouter;
