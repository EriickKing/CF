const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");

const instSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  image: String,
  createdAt:String,
  updatedAt: String
});

const Installations = mongoose.model("Installations", instSchema);

function validate(i) {
  const schema = {
    title: joi.string().required(),
    image: joi.string()
  }
  return joi.validate(i, schema)
}

exports.Installations = Installations;
exports.validate = validate;