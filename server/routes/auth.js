const router = require("express").Router();
const { authorize } = require("passport");
const passport = require("passport");
const AuthController = require("../controllers/authController");
const { checkAuth } = require("../middlewares/auth");

router.get("/me", checkAuth, AuthController.login);

router.post("/signup", AuthController.register);

router.post("/signin", passport.authenticate("local"), AuthController.login);

router.get("/logout", checkAuth, AuthController.logOut);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  AuthController.login
);

router.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;
  contentHTML = `
      <h1>User Information</h1>
      <ul>
      <li> Username: ${name}</li>
      <li> user Email: ${email}</li>
      <li> Phone: ${phone} </li>
      </ul>
      <p>${message}</p>
      `;

  console.log(contentHTML);
  res.send("received");
});

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/secret",
  passport.authenticate("facebook", { failureRedirect: "/login" }),

  AuthController.login
);

router.get("/userface", (req, res) => {
  console.log(req.user, "esto es la respuesta");
  if (req.user) res.send(req.user);

  res.send("aca no hay nada");
});
module.exports = router;
