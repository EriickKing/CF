const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");

const newSchema = new Schema ({
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
  updatedAt: String,
  status: {
    type: Number,
    default: 1
  }
});

const News = mongoose.model("News", newSchema);

function validate(n) {
  const schema = {
    title: joi.string().required(),
    desc: joi.string().required(),
    image: joi.string(),
    status: joi.number()
  }
  return joi.validate(n, schema)
}

exports.News = News;
exports.validate = validate;