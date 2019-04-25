function ValidateJoi(req, res, validate) {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).json({
        success: false,
        message: error.details[0].message
    });
};

function NoImage(req, res) {
    if (!req.file) return res.status(404).json({
        success: false,
        message: "No hay ninguna imagen seleccionada."
    });
};

function InvalidID(req, res) {
    if (req.query.i == "") {
        return res.status(404).json({
            success: false,
            message: "Ingrese algun ID."
        });
    } else if (req.query.i.length < 24 || req.query.i.length > 24) {
        return res.status(400).json({
            success: false,
            message: "ID no valido."
        });
    }
}

function NoFound(res, model) {
    if (!model) return res.status(404).json({
        success: false,
        message: "No encontrado."
    });
}

exports.ValidateJoi = ValidateJoi;
exports.NoImage = NoImage;
exports.InvalidID = InvalidID;
exports.NoFound = NoFound;