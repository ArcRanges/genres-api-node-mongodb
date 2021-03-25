const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Customer, validate } = require("../models/customer");
const { ObjectId } = require("mongoose").Types;

const getAllCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
};

const addNewCustomer = async (req, res) => {
  const { body } = req;
  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.create(body);

  res.send(customer);
};

const updateCustomerById = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).send("Invalid ID for Customer " + id);

  const customer = await Customer.findOneAndUpdate(
    {
      _id: id,
    },
    body,
    { new: true }
  );

  res.send(customer);
};

const deleteCustomerById = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).send("Invalid ID for Customer " + id);

  const customer = await Customer.findByIdAndDelete(id);

  if (!customer) return res.status(400).send("No customer found for id " + id);

  res.send(customer);
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).send("Invalid Customer ID " + id);

  const customer = await Customer.findById(id);

  if (!customer) return res.status(400).send("Customer not found");

  res.send(customer);
};

router.get("/", getAllCustomers);
router.post("/", auth, addNewCustomer);
router.put("/:id", auth, updateCustomerById);
router.delete("/:id", [auth, admin], deleteCustomerById);
router.get("/:id", getCustomerById);

module.exports = router;
