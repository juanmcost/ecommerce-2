const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/Users");

passport.use(
  new facebookStrategy(
    {
      clientID: "431180048397769",
      clientSecret: "d23c78531470700f67ac41fe00f31a2f",
      callbackURL: "http://localhost:8080/auth/facebook",
    },

    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (user) return done(null, user);
      if (!user) {
        const newUser = new User({
          email: profile.emails[0].value,
          username: profile.displayName,
          //password:
        });
        const user = await newUser.save();
        return done(null, user);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
