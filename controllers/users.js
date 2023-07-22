const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const ConflictError = require('../errors/conflict-error');
const AuthError = require('../errors/auth-error');
const { ERROR_MSG } = require('../utils/constants');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((error) => next(error));
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return next(new NotFoundError(ERROR_MSG.NOT_FOUND_USER));
      }
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        return next(new BadRequest(ERROR_MSG.BADREQUEST));
      }
      return next(error);
    });
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MSG.CONFLICT));
      }

      if (error.name === 'ValidationError') {
        return next(new BadRequest(ERROR_MSG.BADREQUEST));
      }
      return next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(ERROR_MSG.AUTH_ERROR);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(
            new AuthError(ERROR_MSG.AUTH_ERROR),
          );
        }
        const token = jwt.sign(
          { _id: user._id },
          config.JWT_SECRET,
          { expiresIn: '7d' },
        );
        return res.send({ token });
      });
    })
    .catch((error) => next(new AuthError(error.message)));
};
