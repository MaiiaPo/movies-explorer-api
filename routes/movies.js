const movieRoutes = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie
} = require('../controllers/movies');
