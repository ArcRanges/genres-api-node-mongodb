const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const { Rental, validate } = require("../models/rental");
const mongoose = require("mongoose");

const getAllRentals = async (req, res) => {
  const rentals = await Rental.find().sort("-dateout");
  res.send(rentals);
};

const addNewRental = async (req, res) => {
  const { body } = req;
  const { customerId, movieId } = req.body;

  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(customerId);
  if (!customer) return res.status(400).send("Customer not found.");

  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(400).send("Movie not found.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  const result = await Rental.create({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
    dateOut: Date.now(),
    rentalFee: 5,
  });

  // mongoose transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await result.save();
    movie.numberInStock--;
    await movie.save();
    session.endSession();
    return res.send(result);
  } catch (error) {
    session.endSession();
    return res.status(500).send("Could not save the new rental");
  }

  // rental = await result.save();

  // movie.numberInStock--;
  // movie.save();

  // res.send(rental);
};

router.get("/", getAllRentals);
router.post("/", auth, addNewRental);

module.exports = router;
