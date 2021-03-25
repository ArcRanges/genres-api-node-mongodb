const Joi = require("joi");
const mongoose = require("mongoose");

const genresSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 12,
    },
  },
  { timestamps: true }
);

const Genre = mongoose.model("Genre", genresSchema);

const validateData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(12),
  });

  return schema.validate(data);
};

exports.Genre = Genre;
exports.validate = validateData;
exports.genresSchema = genresSchema;
