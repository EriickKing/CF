const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");

const planSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  bhour: {
    type: String,
    required: true
  },
  ehour: {
    type: String,
    required: true
  },
  bpromo: String,
  epromo: String,
  image: String,
  createdAt:String,
  updatedAt: String
});

const Plans = mongoose.model("Plans", planSchema);

function validate(p) {
  const schema = {
    title: joi.string().required(),
    price: joi.string().required(),
    bhour: joi.string().required(),
    ehour: joi.string().required(),
    image: joi.string(),
    bpromo: joi.string(),
    epromo: joi.string()
  }
  return joi.validate(p, schema)
}

exports.Plans = Plans;
exports.validate = validate;