const express = require("express");
const router = express.Router();
const functions = require("../../src/functions");
const { Services, validate } = require("../../models/admin/model_service");
const asset = require("../../src/assets");
const error = require("../../src/errors");

router.post("/add", asset.Multer, async (req, res) => {
  error.NoImage(req, res);
  date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
  cloud = await asset.CloudUpload(req, "CentroFit/services");
  json = { title: req.body.title, desc: req.body.desc, image: cloud.secure_url, createdAt: date};
  functions.add(req, res, validate, Services, json)
});

router.put("/edit", asset.Multer, async (req, res) => {
  try {
    error.ValidateJoi(req, res, validate);
    const services = await Services.findOne({ _id: req.query.i });
    var date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
    if (!req.file) {
      services.set({
        title: req.body.title,
        desc: req.body.desc,
        image: services.image,
        updatedAt: date
      });
    } else {
      cloud = await asset.CloudUpload(req, "CentroFit/services");
      services.set({
        title: req.body.title,
        desc: req.body.desc,
        image: cloud.secure_url,
        updatedAt: date
      });
    };

    asset.Save(res, services)
  } catch (err) {
    return err;
  };
});

router.get("/one", async(req, res) => {
  functions.one(req, res, Services);
});

router.get("/all", async (req, res) => {
  json = {title: 1, desc: 1, image: 1}
  functions.all(res, Services, json)
});

router.post("/many", async (req, res) => {
  functions.many(req, res, Services);
})

module.exports = router;