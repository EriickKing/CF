const error = require("./errors");
const asset = require("./assets");

async function all(res, model, json) {
  const all = await model.find()
    .sort({
      createdAt: -1
    })
    .select(json);
  if (all)
    return res.status(200).json({
      success: true,
      all
    });

};

async function one(req, res, model) {
  try {
    // error.InvalidID(req, res);
    const one = await model.findById(req.query.i);
    if (!one) {
      return res.status(404).json({
        success: false,
        message: "No encontrado"
      });
    } else {
      return res.status(200).json({
        success: true,
        one
      });
    };
  } catch (err) {
    return err
  };
}

async function add(req, res, validate, model, json) {
  try {
    error.ValidateJoi(req, res, validate);
    add = new model(json);
    asset.Save(res, add);
  } catch (err) {
    return err;
  };
}

async function many(req, res, model) {
  let ids = req.body.all
  if (ids) {
    const remove = await model.deleteMany({
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
}

exports.all = all;
exports.one = one;
exports.many = many;
exports.add = add;