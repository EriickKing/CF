const cloud = require("cloudinary");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

var store = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./");
    },
    filename: (req, file, cb) => {
      const name = file.originalname.toLocaleLowerCase();
      cb(null, name);
    }
  });

const Multer = multer({ storage: store }).single("image")


async function CloudUpload(req, folder) {
    let imgUrl = await cloud.v2.uploader.upload(req.file.path, {
        folder: folder,
        use_filename: true
    });
    fs.unlinkSync(req.file.path);
    return imgUrl;
};

async function Save(res, model) {
    const saved = await model.save();
    if (saved) return res.status(200).json({
        success: true,
        message: "Guardado Exitoso"
    });
};





exports.CloudUpload = CloudUpload;
exports.Save = Save;
exports.Multer = Multer;
