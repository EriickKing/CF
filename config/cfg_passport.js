const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require("../models/model_user");
const session = require("express-session");
module.exports = (app, passport) => {
    var s
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
            // console.log(user);
        });

    });


    passport.use(new FacebookStrategy({
        clientID: "2245846958769765",
        clientSecret: "5656deefb3891038ce8d521651a8e282",
        callbackURL: "http://localhost:8080/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'email', 'picture.type(large)', "gender", "name", "birthday"],

    },
        function (accessToken, refreshToken, profile, done) {
            s = profile
            console.log(s.displayName);
            console.log(profile.photos[0].value)

            done(null, profile);
        }
    ));

    app.get('/auth/facebook', passport.authorize('facebook', { scope: ['email'] }));


    app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', 
    { failureRedirect: '/login' }),
    function(req, res) {
        return res.redirect("http://localhost:4200/auth=")
    });


    return passport;
}