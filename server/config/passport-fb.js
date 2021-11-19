const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/Users");
require("dotenv");

passport.use(
  new facebookStrategy(
    {
      clientID: "290255342990143",
      clientSecret: "992a3ae81a10dd274719d5595210ddc3",
      callbackURL: "http://localhost:8080/api/auth/facebook/secret",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ facebookId: profile.id }); //lo buscamos en la base de datos y lo devolvemos
      if (user) {
        return done(null, user);
      } else {
        const user = new User(); //si no existe creamos el usuario
        (user.email = `${profile.displayName}@gmail.com`), (user.username = profile.displayName);
        user.password = profile.id;
        user.facebookId = profile.id;
        await user.save(); //guardamos en la base de datos
        done(null, user); //devolvemos el usuario
      }
    }
  )
);
