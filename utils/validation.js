const { Joi } = require('celebrate');
const { urlRegx } = require('./constants');

module.exports.signinValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Некорректная почта',
      'any.required': 'Почта должна быть заполнена',
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Пароль должен быть заполнен',
    }),
  }),
};

module.exports.signupValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "имя" не должно быть меньше 2 символов',
      'string.max': 'Поле "имя" не должно быть больше 30 символов',
      'any.required': 'Поле "имя" должно быть заполнено',
    }),
    email: Joi.string().required().email().messages({
      'string.email': 'Некорректная почта',
      'any.required': 'Почта должна быть заполнена',
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Пароль должен быть заполнен',
    }),
  }),
};

module.exports.updateUserValidation = {
  body: Joi.object({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле "имя" не должно быть меньше 2 символов',
      'string.max': 'Поле "имя" не должно быть больше 30 символов',
    }),
    email: Joi.string().email().messages({
      'string.email': 'Некорректная почта',
    }),
  }),
};

module.exports.createMovieValidation = {
  body: Joi.object({
    country: Joi.string().required().messages({
      'any.required': 'Поле "country" должно быть заполнено',
    }),
    director: Joi.string().required().messages({
      'any.required': 'Поле "director" должно быть заполнено',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Поле "duration" должно быть заполнено',
    }),
    year: Joi.string().required().messages({
      'any.required': 'Поле "year" должно быть заполнено',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Поле "description" должно быть заполнено',
    }),
    image: Joi.string().regex(urlRegx).required().messages({
      'string.dataUri': 'Невалидная ссылка',
      'any.required': 'Поле "image" должно быть заполнено',
    }),
    trailerLink: Joi.string().regex(urlRegx).required().messages({
      'string.dataUri': 'Невалидная ссылка',
      'any.required': 'Поле "trailerLink" должно быть заполнено',
    }),
    thumbnail: Joi.string().regex(urlRegx).required().messages({
      'string.dataUri': 'Невалидная ссылка',
      'any.required': 'Поле "thumbnail" должно быть заполнено',
    }),
    nameRU: Joi.string().required().messages({
      'any.required': 'Поле "nameRU" должно быть заполнено',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Поле "nameEN" должно быть заполнено',
    }),
    movieId: Joi.number().required().messages({
      'any.required': 'Поле "movieId" должно быть заполнено',
    }),
  }),
};

module.exports.deleteMovieValidation = {
  params: Joi.object({
    movieId: Joi.string().hex().length(24).messages({
      'string.hex': 'Некорректный id',
    }),
  }),
};
