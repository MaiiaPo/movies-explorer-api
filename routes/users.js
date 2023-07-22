const userRoutes = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getUser,
  updateUser,
} = require('../controllers/users');
const { updateUserValidation } = require('../utils/validation');

userRoutes.get('/me', getUser);
userRoutes.patch('/me', celebrate(updateUserValidation), updateUser);

module.exports = userRoutes;
