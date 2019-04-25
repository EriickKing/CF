const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/model_user");
const bcrypt = require("bcryptjs");
const asset = require("../src/assets");
const error = require("../src/errors");
router.post("/register", async (req, res) => {
    try {
        var date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
        error.ValidateJoi(req, res, validate);
        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(400).json({
                success: false,
                message: "Ya ha sido registrado"
            })

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            createdAt: date
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        asset.Save(res, user);

    } catch (err) {
        return err;
    };
});

router.post("/socialregister", async (req, res) => {
    try {
        var date = new Date().toString().replace(/ \w+-\d+ \(.*\)$/, "");
        let user = await User.findOne({ id: req.body.id });
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
    let user = await User.findOne({ id: req.body.id });
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

module.exports = router;