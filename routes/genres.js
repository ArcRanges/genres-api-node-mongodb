const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");

const getAllGenres = async (req, res, next) => {
  const genres = await Genre.find();
  res.send(genres);
};

const addGenre = async (req, res) => {
  const { body } = req;
  const { error } = validate(body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    name: body.name,
  };

  const result = await Genre.create(genre);
  res.send(result);
};

const updateGenreById = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!genre) return res.status(400).send("Genre not found");

  res.send(genre);
};

const deleteGenreById = async (req, res) => {
  const { id } = req.params;

  const genre = await Genre.findByIdAndDelete(id);

  if (!genre) return res.status(404).send("Genre not found");

  return res.send(genre);
};

const getGenreById = async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(400).send("Genre not found");

  res.send(genre);
};

router.get("/", getAllGenres);
router.post("/", auth, addGenre);
router.put("/:id", [auth, validateObjectId], updateGenreById);
router.delete("/:id", [auth, admin, validateObjectId], deleteGenreById);
router.get("/:id", validateObjectId, getGenreById);

module.exports = router;
