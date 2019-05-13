const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");

const articleSchema = new Schema({
    name: {
        type: String,
        required: true,
        uppercase: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: String,
        required: true,
        lowercase: true
    },
    genre: {
        type: String,
        required: true,
        lowercase: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: Array,
        required: true,
        uppercase: true
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
    }
});

const Article = mongoose.model("Article", articleSchema);

function validate(article) {
    const schema = {
            name: joi.string().required(),
            desc: joi.string().required(),
            price: joi.number().required(),
            stock: joi.number().required(),
            image: joi.string(),
            category: joi.string().required(),
            genre: joi.string().required(),
            color: joi.string().required(),
            size: joi.array().required(),
            status: joi.number()
    }

    return joi.validate(article, schema)
}

exports.Article = Article;
exports.validate = validate;