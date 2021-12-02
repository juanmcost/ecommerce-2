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
        async (accessToken, refreshToken, profile, done) => {
            const user = await User.findOne({ googleId: profile.id }); //lo buscamos en la base de datos y lo devolvemos
            if (user) {
                return done(null, user);
            } else {
                const user = new User();
                (user.email = profile.emails[0].value), (user.username = profile.displayName);
                user.password = profile.id;
                user.googleId = profile.id;
                user.image = profile.photos[0].value;
                await user.save();
                done(null, user);
            }
        }
    )
);
