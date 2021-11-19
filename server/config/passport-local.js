const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');
const state = 'pending';
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            // Match Email's User
            const user = await User.find({ email: email });
            console.log('esto es user', user);
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

//el registro al parecer lo hace bine porque te trae el req.user, el tema seria el logueo
//fijate que creo que no hcae falta la condicion ya que ya tiene _id el usuario registrado por facebook
passport.deserializeUser(async (id, done) => {
    User.find({ facebookId: id }).then((userf) => {
        return userf.length
            ? done(null, userf)
            : User.find({ googleId: id }).then((userg) => {
                  userg.length ? done(null, userg) : User.find({ _id: id }).then((user) => done(null, user));
              });
    });
});
