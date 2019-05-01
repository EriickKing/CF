const express = require("express");
const router = express.Router();
const functions = require("../../src/functions");
const {
  Plans,
  validate
} = require("../../models/admin/model_plan");
const asset = require("../../src/assets");
const error = require("../../src/errors");

router.post("/add", asset.Multer, async (req, res) => {
  error.NoImage(req, res);
  date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
  cloud = await asset.CloudUpload(req, "CentroFit/plans");
  json = {
    title: req.body.title,
    price: req.body.price,
    bhour: req.body.bhour,
    ehour: req.body.ehour,
    image: cloud.secure_url,
    epromo: req.body.epromo,
    bpromo: req.body.bpromo,
    createdAt: date
  };
  functions.add(req, res, validate, Plans, json)
});

router.put("/edit", asset.Multer, async (req, res) => {
  try {
    // error.ValidateJoi(req, res, validate);
    const plans = await Plans.findOne({ _id: req.query.i });
    var date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
    if (!req.file) {
      plans.set({
        title: req.body.title,
        price: req.body.price,
        bhour: req.body.bhour,
        ehour: req.body.ehour,
        image: plans.image,
        epromo: req.body.epromo,
        bpromo: req.body.bpromo,
        createdAt: date
      });
    } else {
      cloud = await asset.CloudUpload(req, "CentroFit/plans");
      plans.set({
        title: req.body.title,
        price: req.body.price,
        bhour: req.body.bhour,
        ehour: req.body.ehour,
        image: cloud.secure_url,
        epromo: req.body.epromo,
        bpromo: req.body.bpromo,
        createdAt: date
      });
    };

    asset.Save(res, plans)
  } catch (err) {
    return err;
  };
});


router.get("/one", async (req, res) => {
  functions.one(req, res, Plans);
});

router.get("/all", async (req, res) => {
  json = {
    title: 1,
    price: 1,
    bhour: 1,
    ehour: 1,
    image: 1,
    bpromo: 1,
    epromo: 1
  }
  functions.all(res, Plans, json)
});

module.exports = router;