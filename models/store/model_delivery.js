const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");
const { userSchema } = require("../model_user");

const deliverySchema = new Schema({
  user: userSchema,
  name: String
})
 
const Delivery = mongoose.model("Delivery", deliverySchema);


module.Delivery = Delivery;