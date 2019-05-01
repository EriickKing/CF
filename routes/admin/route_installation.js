const express = require("express");
const router = express.Router();
const functions = require("../../src/functions");
const { Installations, validate } = require("../../models/admin/model_installation");
const asset = require("../../src/assets");
const error = require("../../src/errors");

router.post("/add", asset.Multer, async (req, res) => {
  error.NoImage(req, res);
  date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
  cloud = await asset.CloudUpload(req, "CentroFit/inst");
  json = { title: req.body.title, image: cloud.secure_url, createdAt: date};
  functions.add(req, res, validate, Installations, json)
});

router.put("/edit", asset.Multer, async (req, res) => {
  try {
    error.ValidateJoi(req, res, validate);
    const inst = await Installations.findOne({ _id: req.query.i });
    var date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
    if (!req.file) {
      inst.set({
        title: req.body.title,
        image: inst.image,
        updatedAt: date
      });
    } else {
      cloud = await asset.CloudUpload(req, "CentroFit/inst");
      inst.set({
        title: req.body.title,
        image: cloud.secure_url,
        updatedAt: date
      });
    };

    asset.Save(res, inst)
  } catch (err) {
    return err;
  };
});

router.get("/one", async(req, res) => {
  functions.one(req, res, Installations);
});

router.get("/all", async (req, res) => {
  json = {title: 1, image: 1}
  functions.all(res, Installations, json)
});

router.post("/many", async (req, res) => {
  functions.many(req, res, Installations);
})

module.exports = router;