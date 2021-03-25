const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

const authenticate = async (req, res) => {
  const { body } = req;

  // validate request parameters [email, password]
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if email is valid and user is registered
  let user = await User.findOne({ email: body.email });
  if (!user) return res.status(400).send("Invalid email and/or password.");

  // finally check password if it's valid
  const isValidUser = await bcrypt.compare(body.password, user.password);
  if (!isValidUser)
    return res.status(400).send("Invalid email and/or password.");

  // generate user token and return JWT
  const token = user.generateAuthToken();

  res.send(token);
};

router.post("/", authenticate);

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().max(255).required(),
  });
  return schema.validate(data);
};

module.exports = router;
