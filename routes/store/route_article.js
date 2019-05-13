const express = require("express");
const router = express.Router();
const functions = require("../../src/functions");
const {
  Article,
  validate
} = require("../../models/store/model_article");
const asset = require("../../src/assets");
const error = require("../../src/errors");

router.post("/add", asset.Multer, async (req, res) => {
  error.NoImage(req, res);
  date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
  cloud = await asset.CloudUpload(req, "CentroFit/Store/articles");
  json = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    stock: req.body.stock,
    image: cloud.secure_url,
    category: req.body.category,
    genre: req.body.genre,
    color: req.body.color,
    size: req.body.size,
    createdAt: date
  };
  functions.add(req, res, validate, Article, json);
})

router.get("/woman", async (req, res) => {
  const article = await Article.find()
    .sort({
      createdAt: -1
    })
    .where({
      genre: "m"
    })
  if (article)
    return res.status(200).json({
      success: true,
      article
    })
})

router.get("/category", async (req, res) => {
  const article = await Article.find()
    .sort({
      createdAt: -1
    })
    .where({
      category: req.query.filter
    })
  if (article)
    return res.status(200).json({
      success: true,
      article
    })
});

router.get("/one", async (req, res) => {
  functions.one(req, res, Article);
});

router.post("/many", async (req, res) => {
  let ids = req.body.all
  if (ids) {
    const articles = await Article.find({
      _id: {
        $in: ids
      }
    })
    if (articles)
      return res.status(200).json({
        success: true,
        articles
      });
  } else {
    return res.status(404).json({
      success: false,
      message: "No hay nada"
    })
  }

});


module.exports = router;