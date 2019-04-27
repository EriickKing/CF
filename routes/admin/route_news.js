const express = require("express");
const router = express.Router();
const {
  News,
  validate
} = require("../../models/admin/model_news");
const asset = require("../../src/assets");
const error = require("../../src/errors");
router.post("/add", asset.Multer, async (req, res) => {
  try {
    var date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
    error.ValidateJoi(req, res, validate);
    error.NoImage(req, res);
    let cloud = await asset.CloudUpload(req, "CentroFit/news");
    news = new News({
      title: req.body.title,
      desc: req.body.desc,
      image: cloud.secure_url,
      createdAt: date
    });
    asset.Save(res, news);

  } catch (err) {
    return err;
  };
});

router.put("/edit", asset.Multer, async (req, res) => {
  try {
    error.ValidateJoi(req, res, validate);
    error.InvalidID(req, res);
    const news = await News.findOne({ _id: req.query.i });
    error.NoFound(res, news);
    if (!req.file) {
      news.set({
        image: news.image
      });
    } else {
      cloud = await asset.CloudUpload(req, "CentroFit/news");
    };
    var date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
    news.set({
      title: req.body.title,
      desc: req.body.desc,
      image: cloud.secure_url,
      updatedAt: date
    });
    asset.Save(res, news)
  } catch (err) {
    return err;
  };
});

router.get("/one", async(req, res) => {
  try {
    error.InvalidID(req, res);
    const news = await News.findById(req.query.i);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "No encontrado"
      });
    } else {
      return res.status(200).json({
        success: true,
        news
      });
    };
  } catch (err) {
    return err
  };
});

router.get("/all", async (req, res) => {
  const news = await News.find()
    .where("status").equals(1)
    .select({
      title: 1,
      desc: 1,
      image: 1
    });
  if (news.length !== 0) {
    return res.status(200).json({
      success: true,
      news
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "No hay nada que mostrar"
    });
  };
});

router.post("/many", async (req, res) => {
  let ids = req.body.all
  if (ids) {
    const remove = await News.deleteMany({
      _id: {
        $in: ids
      }
    })
    if (remove)
      return res.status(200).json({
        success: true,
        message: "Borrado(s)"
      })
  } else {
    return res.status(404).json({
      success: false,
      message: "No hay nada"
    })
  }


})

module.exports = router;