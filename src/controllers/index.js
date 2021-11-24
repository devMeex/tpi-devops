/* const database = require('../db'); */
const Movie = require("../db/models/movie");

const getMovies = async (req, res, next) => {
  try {
    const Movies = await Movie.query().select();
    res.status(200).json(Movies);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addMovie = async (req, res, next) => {
  const movie = {
    title: req.body.title,
    year: req.body.year,
    gender: req.body.gender,
  };
  try {
    const response = await Movie.query().insert(movie);
    res.status(200).json({ msg: "Movie added successfully!", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getMovies,
  addMovie,
};
