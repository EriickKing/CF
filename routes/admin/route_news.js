const express = require("express");
const router = express.Router();
const functions = require("../../src/functions");
const {
  News,
  validate
} = require("../../models/admin/model_news");
const asset = require("../../src/assets");
const error = require("../../src/errors");

router.post("/add", asset.Multer, async (req, res) => {
  error.NoImage(req, res);
  date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
  cloud = await asset.CloudUpload(req, "CentroFit/news");
  json = { title: req.body.title, desc: req.body.desc, image: cloud.secure_url, createdAt: date};
  functions.add(req, res, validate, News, json)
});

router.put("/edit", asset.Multer, async (req, res) => {
  try {
    error.ValidateJoi(req, res, validate);
    // error.InvalidID(req, res);
    const news = await News.findOne({ _id: req.query.i });
    // error.NoFound(res, news);
    var date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
    if (!req.file) {
      news.set({
        title: req.body.title,
        desc: req.body.desc,
        image: news.image,
        updatedAt: date
      });
    } else {
      cloud = await asset.CloudUpload(req, "CentroFit/news");
      news.set({
        title: req.body.title,
        desc: req.body.desc,
        image: cloud.secure_url,
        updatedAt: date
      });
    };

    asset.Save(res, news)
  } catch (err) {
    return err;
  };
});

router.get("/one", async(req, res) => {
  functions.one(req, res, News);
});

router.get("/all", async (req, res) => {
  json = {title: 1, desc: 1, image: 1}
  functions.all(res, News, json)
});

router.post("/many", async (req, res) => {
  functions.many(req, res, News);
})

module.exports = router;