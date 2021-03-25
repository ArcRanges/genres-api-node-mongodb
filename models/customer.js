const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 12,
  },
  phone: {
    type: String,
    default: "",
    minlength: 7,
    maxlength: 10,
    required: true,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});

const Customer = new mongoose.model("Customer", customerSchema);

const validateData = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(12),
    isGold: Joi.boolean(),
    phone: Joi.string().required().min(7).max(10),
  });

  return schema.validate(data);
};

exports.Customer = Customer;
exports.customerSchema = customerSchema;
exports.validate = validateData;
