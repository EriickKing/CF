const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto").randomBytes(256).toString("hex");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number
    },
    image: {
        type: String
    },
    birthdate: {
        type: Date
    },
    address: {
        type: String
    },
    typeAcc: {
        type: String,
        default: "normal"
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    id: String
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id, typeAcc: this.typeAcc },
        crypto, { expiresIn: "6h"}
    );
    return token;
};

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

const User = mongoose.model("User", userSchema);

function validate(user) {
    const schema = {
        id: joi.string(),
        name: joi.string().required(),
        password: joi.string(),
        email: joi.string().required().email(),
        phone: joi.number(),
        image: joi.string(),
        birthdate: joi.date(),
        address: joi.array(),
        typeAcc: joi.string(),
        status: joi.number()
    }

    return joi.validate(user, schema)
}

exports.User = User;
exports.validate = validate;