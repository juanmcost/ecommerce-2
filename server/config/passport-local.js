const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            // Match Email's User
            const user = await User.find({ email: email });
            if (!user) return done(null, false, { message: 'email not found' });

            // Match Password's User
            const match = await new User(...user).matchPassword(password);
            if (match) return done(null, user);

            return done(null, false, { message: 'password not found' });
        }
    )
);

passport.serializeUser((user, done) => {
    if (user.facebookId == null && user.googleId == null) return done(null, user[0]._id);
    return (user.googleId && done(null, user.googleId)) || done(null, user.facebookId);
});

passport.deserializeUser(async (id, done) => {
    User.find({ facebookId: id }).then((userf) => {
        return userf.length
            ? done(null, userf)
            : User.find({ googleId: id }).then((userg) => {
                  userg.length ? done(null, userg) : User.find({ _id: id }).then((user) => done(null, user));
              });
    });
});
