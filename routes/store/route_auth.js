const express = require("express");
const router = express.Router();
const joi = require("joi");
const {
  User,
  validate
} = require("../models/model_user");
const asset = require("../src/assets");
const error = require("../src/errors");

module.exports = router;