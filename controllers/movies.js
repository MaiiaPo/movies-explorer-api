const Movie = require('../models/movie');
const BadRequest = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');
const { ERROR_MSG } = require('../utils/constants');

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
        return next(new BadRequest(ERROR_MSG.BADREQUEST));
      }
      return next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new Error('NotValidId'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError(ERROR_MSG.FORBIDDEN));
      }
      return Movie.deleteOne(movie)
        .then((deletedMovie) => {
          if (deletedMovie.deletedCount === 0) {
            throw new NotFoundError(ERROR_MSG.NOT_FOUND_MOVIE);
          }
          return res.send({ message: 'Фильм успешно удален' });
        })
        .catch((error) => next(error));
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return next(new NotFoundError(ERROR_MSG.NOT_FOUND_MOVIE));
      }
      return next(new BadRequest(ERROR_MSG.NOT_FOUND_MOVIE));
    });
};
