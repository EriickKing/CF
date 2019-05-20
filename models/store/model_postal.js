const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postalSchema = new Schema({
  postal: {
    type: String
  }
})

const Postal = mongoose.model("Postal", postalSchema)