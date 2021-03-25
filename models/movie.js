const Joi = require("joi");
const mongoose = require("mongoose");
const { genresSchema } = require("./genre");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 28,
    },
    genre: {
      type: genresSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      default: 1,
      min: 0,
      max: 999,
    },
    dailyRentalRate: {
      type: Number,
      default: 5,
      min: 0,
      max: 99,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

const validateData = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(12),
    numberInStock: Joi.number().min(0).max(999),
    genreId: Joi.objectId().required(),
    dailyRentalRate: Joi.number().min(0).max(99),
  });

  return schema.validate(data);
};

exports.Movie = Movie;
exports.movieSchema = movieSchema;
exports.validate = validateData;
