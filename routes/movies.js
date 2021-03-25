const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { Genre, genresSchema } = require("../models/genre");
const { Movie, validate } = require("../models/movie");

const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  if (!movies) return res.status(400).send("No movies found");

  res.send(movies);
};

const addMovie = async (req, res) => {
  const { body } = req;
  const { error } = validate(body);

  if (error) return res.status(400).send(error.details[0].message);

  if (!ObjectId.isValid(body.genreId))
    return res.status(400).send("Invalid Genre ID " + body.genreId);

  const genre = await Genre.findById(body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  let movie = new Movie({
    title: body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: body.numberInStock,
    dailyRentalRate: body.dailyRentalRate,
  });

  const result = await Movie.create(movie);
  res.send(result);
};

const updateMovieById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findOneAndUpdate({ _id: id }, body, { new: true });

  if (!movie) return res.status(400).send("Movie not found");

  res.send(movie);
};

const deleteMovieById = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndDelete(id);

  if (!movie) return res.status(400).send("Movie not found");

  return res.send(movie);
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).send("Invalid Movie ID " + id);

  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(400).send("Movie not found");

  res.send(movie);
};

router.get("/", getAllMovies);
router.post("/", auth, addMovie);
router.put("/:id", auth, updateMovieById);
router.delete("/:id", [auth, admin], deleteMovieById);
router.get("/:id", getMovieById);

module.exports = router;
