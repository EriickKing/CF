const express = require("express");
const router = express.Router();
const joi = require("joi");
const {
  User,
  validate
} = require("../models/model_user");
const bcrypt = require("bcryptjs");
const asset = require("../src/assets");
const error = require("../src/errors");
const functions = require("../src/functions");
router.post("/register", async (req, res) => {
  try {
    var date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
    error.ValidateJoi(req, res, validate);
    let user = await User.findOne({
      email: req.body.email
    });
    if (user)
      return res.status(400).json({
        success: false,
        message: "Ya ha sido registrado"
      })

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      typeAcc: req.body.typeAcc,
      createdAt: date
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    asset.Save(res, user);

  } catch (err) {
    return err;
  };
});

router.post("/oneuser", async(req, res) => {
  const one = await User.findOne({ _id: req.body.id});
  res.status(200).json({
    success: true,
    one
  })
})

router.post("/socialregister", async (req, res) => {
  try {
    var date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
    let user = await User.findOne({
      id: req.body.id
    });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "register"
      })
    } else {
      user = new User({
        name: req.body.name,
        id: req.body.id,
        email: req.body.email,
        createdAt: date,
        typeAcc: req.body.provider
      })
      asset.Save(res, user);
    }
  } catch (err) {
    return err
  }

});
router.post("/sociallogin", async (req, res) => {
  let user = await User.findOne({
    id: req.body.id
  });
  if (!user)
    return res.status(400).json({
      success: false,
      message: "login"
    });
  const token = user.generateAuthToken();
  res.status(200).json({
    success: true,
    token: token,
    user: user
  })
});

router.post("/login", async (req, res) => {
  error.ValidateJoi(req, res, validate2);
  let user = await User.findOne({
    email: req.body.email
  });
  if (!user)
    return res.status(400).json({
      success: false,
      message: "Usuario no existe"
    });
  const validPassword = await user.comparePassword(req.body.password);
  if (!validPassword)
    return res.status(400).json({
      success: false,
      message: "Contraseña incorrecta"
    });
  const token = user.generateAuthToken();
  res.status(200).json({
    success: true,
    token: token,
    user: user
  });
})
function validate2(req) {
  const schema = {
      email: joi.string().required(),
      password: joi.string().required()
  };
  return joi.validate(req, schema)
}

module.exports = router;