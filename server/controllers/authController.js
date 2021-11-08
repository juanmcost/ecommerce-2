const User = require('../models/Users');
const jwt = require('jsonwebtoken');

class AuthController {
    // Register
    static async register(req, res, next) {
        const { username, password, email } = req.body;
        const { error } = joi.validate({ username, password, email });

        if (!error) {
            const user = await UsersService.createUser(req.body);
            return user ? res.json({ user }) : res.status(404).send('Bad Request');
        }
        next(error);
    }

    static login = (req, res) => res.send(req.user);
    

    static async logOut(req, res) {
        await req.logOut();
        res.status(200).clearCookie('connect.sid', {
            path: '/',
        });
        req.session.destroy(function (err) {
            res.send({});
        });
    }
}

module.exports = AuthController;
