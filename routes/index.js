const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const movieRouter = require('./movies');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
