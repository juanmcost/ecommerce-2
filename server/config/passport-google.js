const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/Users');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:8080/api/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('PROFILE');
            console.log(profile);
            console.log('TOKEN');
            console.log(accessToken);
            console.log('');
            console.log('REFRESJ-TOKEN');
            console.log(refreshToken);
            // User.findOrCreate({ email: profile.email }, function (err, user) {
            //     return done(err, user);
            // });
            return done(null, profile);
        }
    )
);

passport.serializeUser((gUser, done) => done(null, user[0].id));

passport.deserializeUser((id, done) => User.find({ _id: id }).then((user) => done(null, user)));
