const express = require("express");
const router = express.Router();
const functions = require("../../src/functions");
const {
  Hours
} = require("../../models/admin/model_hour");
const asset = require("../../src/assets");
const error = require("../../src/errors");

router.post("/add", async (req, res) => {
  date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
  json = {
    category: req.body.category,
    bday: req.body.bday,
    eday: req.body.eday,
    hour: req.body.hour,
    houram: req.body.houram,
    hourpm: req.body.hourpm,
    saturday: req.body.saturday,
    shour: req.body.shour,
    shouram: req.body.shouram,
    shourpm: req.body.shourpm,
    createdAt: date
  };
  add = new Hours(json);
  asset.Save(res, add);
})

router.put("/edit", async (req, res) => {
  try {
    const hours = await Hours.findOne({
      _id: req.query.i
    });
    var date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
    json = {
      category: req.body.category,
      bday: req.body.bday,
      eday: req.body.eday,
      hour: req.body.hour,
      houram: req.body.houram,
      hourpm: req.body.hourpm,
      saturday: req.body.saturday,
      shour: req.body.shour,
      shouram: req.body.shouram,
      shourpm: req.body.shourpm,
      updatedAt: date
    };
    hours.set(json)
    asset.Save(res, hours)
  } catch (err) {
    return err
  }
})

router.post("/one", async (req, res) => {
  const one = await Hours.findOne({
    category: req.body.category
  })
  if (!one) {
    return res.status(404).json({
      success: false,
      message: "No encontrado"
    });
  } else {
    return res.status(200).json({
      success: true,
      one
    });
  };

})

module.exports = router;