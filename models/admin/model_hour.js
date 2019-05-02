const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");

const hourSchema = new Schema({
  category: {
    type: String,
    required: true,
    lowercase: true
  },
  bday: {
    type: String,
    required: true
  },
  eday: {
    type: String,
    required: true
  },
  hour: String,
  houram: String,
  hourpm: String,
  saturday: String,
  shour: String,
  shouram: String,
  shourpm: String,
  createdAt: String,
  updatedAt: String
});

const Hours = mongoose.model("Hours", hourSchema)


exports.Hours = Hours;
