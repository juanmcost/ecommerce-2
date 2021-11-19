const User = require("../models/Users");
const bcrypt = require("bcrypt");

class UserController {
  // GET ONE
  static async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id, { status: true }).select({ password: 0 });
      const { password, ...userData } = user._doc;
      res.status(201).json(userData);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  // GET ALL
  static async getAllUsers(req, res) {
    try {
      const users = await User.find({ status: true }).select({ password: 0 });
      return res.json(users);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  // Update User
  static async editUser(req, res) {
    try {
      req.body.password ? (req.body.password = bcrypt.hashSync(req.body.password, 12)) : null;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log(user);
      return user ? res.status(201).json(user) : res.status(400).json("Bad update");
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async setAdmin(req, res) {
    try {
      const newAdmin = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            isAdmin: true,
          },
        },
        { new: true }
      );
      return newAdmin ? res.status(201).json(newAdmin) : res.status(400).json("Bad update");
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async editMyAccount(req, res) {
    try {
      req.body.password ? (req.body.password = bcrypt.hashSync(req.body.password, 12)) : null;
      const user = await User.findByIdAndUpdate(
        req.body._id,
        {
          $set: req.body,
        },
        { new: true }
      );

      return user ? res.status(201).json(user) : res.status(400).json("Bad update");
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async deleteUser(req, res) {
    try {
      const deleted = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            status: false,
          },
        },
        { new: true }
      );
      return deleted ? res.status(204).json(deleted) : null;
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async deleteUser1(req, res) {
    try {
      const deleted = await User.findByIdAndDelete(req.params.id);
      return deleted ? res.status(204).json(deleted) : null;
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

module.exports = UserController;
