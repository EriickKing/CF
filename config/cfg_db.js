const crypto = require("crypto").randomBytes(256).toString("hex");

module.exports = {
    uri: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds034807.mlab.com:34807/centrofit`,
    secret: crypto,
    db: 'CF'
}