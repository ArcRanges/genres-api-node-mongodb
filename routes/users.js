const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");

const get = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

const addUser = async (req, res) => {
  const { body } = req;
  const { error } = validate(body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: body.email });
  if (user) return res.status(400).send("User already exists");

  user = new User(_.pick(body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const result = await User.create(user);

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(result, ["_id", "name", "email"]));
};

router.get("/me", auth, get);
router.post("/", addUser);

module.exports = router;
