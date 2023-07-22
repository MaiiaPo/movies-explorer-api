const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const movieRouter = require('./movies');
const { signupValidation, signinValidation } = require('../utils/validation');

router.post('/signin', celebrate(signinValidation), login);
router.post('/signup', celebrate(signupValidation), createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
