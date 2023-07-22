const movieRoutes = require('express').Router();

const { celebrate } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../utils/validation');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', celebrate(createMovieValidation), createMovie);
movieRoutes.delete('/:movieId', celebrate(deleteMovieValidation), deleteMovie);

module.exports = movieRoutes;
