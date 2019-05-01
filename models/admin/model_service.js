const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");

const serviceSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  image: String,
  createdAt:String,
  updatedAt: String
});

const Services = mongoose.model("Services", serviceSchema);

function validate(s) {
  const schema = {
    title: joi.string().required(),
    desc: joi.string().required(),
    image: joi.string()
  }
  return joi.validate(s, schema)
}

exports.Services = Services;
exports.validate = validate;