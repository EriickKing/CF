const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");

const addressSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  postal: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  municip: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  suburb: {
    type: String,
    required: true
  },
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  },
})

const Address = mongoose.model("Address", addressSchema);

function validate(address) {
  const schema = {
    user: joi.string().required(),
    name: joi.string().required(),
    address: joi.string().required(),
    phone: joi.number().required(),
    postal: joi.string().required(),
    state: joi.string().required(),
    municip: joi.string().required(),
    city: joi.string().required(),
    suburb: joi.string().required(),
  }
  return joi.validate(address, schema)
}

exports.Address = Address;
exports.validate = validate;