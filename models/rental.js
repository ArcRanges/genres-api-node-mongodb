const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const rentalSchema = new mongoose.Schema(
  {
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 12,
        },
        phone: {
          type: String,
          minlength: 7,
          maxlength: 10,
          required: true,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
      }),
      required: true,
    },
    movie: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 28,
      },

      dailyRentalRate: {
        type: Number,
        default: 5,
        min: 0,
        max: 99,
      },
    }),
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  },

  { timestamps: true }
);

const Rental = mongoose.model("Rental", rentalSchema);

const validateData = (data) => {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(data);
};

exports.Rental = Rental;
exports.rentalSchema = rentalSchema;
exports.validate = validateData;
