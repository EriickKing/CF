const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const functions = require("../../src/functions");
const {
  Address,
  validate
} = require("../../models/store/model_address");
const asset = require("../../src/assets");
const error = require("../../src/errors");

router.post("/add", async (req, res) => {
  date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
  json = {
    user: req.body.user,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    postal: req.body.postal,
    state: req.body.state,
    municip: req.body.municip,
    city: req.body.city,
    suburb: req.body.suburb,
    createdAt: date
  }
  functions.add(req, res, validate, Address, json);
})

router.post("/byuser", async (req, res) => {
  const address = await Address.find()
    .where({
      user: req.body.user
    })
  res.status(200).json({
    success: true,
    address
  })
})

router.post("/delete", async(req, res) => {
  const remove = await Address.deleteOne({ _id: req.body.id})
  res.status(200).json({
    success: true,
    message: "Borrado"
  })
})

router.put("/edit", async(req, res) => {
  error.ValidateJoi(req, res, validate);
  const address = await Address.findById(req.query.i);
  date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
  if (address) {
    address.set({
      user: req.body.user,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      postal: req.body.postal,
      state: req.body.state,
      municip: req.body.municip,
      city: req.body.city,
      suburb: req.body.suburb,
      updatedAt: date
    })
    asset.Save(res, address);
  } else {
    return false
  }
})

router.get("/one", async(req, res) => {
  functions.one(req, res, Address)
})




const postalSchema = new Schema({
  postal: String,
  name: String,
  municipio: String,
  estado: String,
  ciudad: String
})

const Postal = mongoose.model("Postal", postalSchema)

router.post("/postal", async (req, res) => {
  const postal = await Postal.find()
    .where({
      postal: req.body.postal
    })
  res.status(200).json({
    success: true,
    postal
  })
})

// router.get("/postal", async (req, res) => {
//   fs.createReadStream("./mochis.csv")
//     .pipe(csv())
//     .on("data", async (data) => {
//       postal = new Postal ({
//         postal: data[0],
//         name: data[1],
//         municipio: data[3],
//         estado: data[4],
//         ciudad: data[5]
//       })
//       const save = await postal.save();
//     })
//     .on("end", (data) => {
//       console.log("read finished")
//     });
// })
module.exports = router;