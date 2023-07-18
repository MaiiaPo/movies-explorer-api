const movieRoutes = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', createMovie);
movieRoutes.delete('/:movieId', deleteMovie);

module.exports = movieRoutes;
