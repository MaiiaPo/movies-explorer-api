/* eslint-disable import/no-unresolved */
const Movie = require('../models/Movie');
const BadRequest = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;

  Movie.create({ ...req.body, owner: userId })
    .then((movie) => {
      res.send(movie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      return next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  return Movie.deleteOne({ _id: movieId })
    .then((movie) => {
      if (movie.deletedCount === 0) {
        throw new NotFoundError(`Фильм с id: ${movieId} не найден`);
      }
      return res.send({ message: 'Фильм успешно удален' });
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return next(new NotFoundError(`Фильм с id: ${movieId} не найден`));
      }
      return next(new BadRequest(`Фильм с id: ${movieId} не найден`));
    });
};
