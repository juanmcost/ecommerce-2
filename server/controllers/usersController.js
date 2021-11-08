const User = require('../models/Users');

class UserController {
    static async getUser(req, res, next) {
        try {
            const users = await User.find({ status: true }).select({ password: 0 });
            return res.json(users);
        } catch (error) {
            res.sendStatus(500);
        }
    }
}

module.exports = UserController;
