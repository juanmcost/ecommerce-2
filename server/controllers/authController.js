const User = require("../models/Users");
const { joiSchema } = require("../utils/joi");

class AuthController {
  // Register
  static async register(req, res, next) {
    try {
      const { username, password, email } = req.body;
      const { error } = joiSchema.validate({ username, password, email });
      if (!error) {
        const newUser = new User(req.body);
        const user = await newUser.save();
        return user ? res.json(user) : res.status(500).send("Error on .save()");
      }
      return res.status(404).json("Bad Request");
    } catch (error) {
      return res.json(error);
    }
  }

  static login = (req, res) => {
    res.send(req.user);
  };

  static async logOut(req, res) {
    await req.logOut();
    res.status(200).clearCookie("connect.sid", {
      path: "/",
    });
    req.session.destroy(function (err) {
      res.send({});
    });
  }
}

module.exports = AuthController;
