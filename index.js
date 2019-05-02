const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
    path: "./.env"
});
const cloudinary = require("./config/cfg_cloudinary");
cloudinary.cfg();
require("./src/db")();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
        // '*'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE'
    );
    next();
});

app.use(express.static(__dirname + "/frontend"))

require("./src/routes")(app);

app.use((req, res, next) => {
    res.sendfile(path.join(__dirname + "/frontend/index.html"));
})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Port: ${port}`));