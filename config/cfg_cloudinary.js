const cloud = require("cloudinary");

exports.cfg = function() {
  return cloud.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })
}