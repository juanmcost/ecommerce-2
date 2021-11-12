const router = require('express').Router();
const passport = require('passport');

const AuthController = require('../controllers/authController');
const { checkAuth } = require('../middlewares/auth');

router.get('/me', checkAuth, AuthController.login);

router.post('/signup', AuthController.register);

router.post('/signin', passport.authenticate('local'), AuthController.login);

router.get('/logout', checkAuth, AuthController.logOut);

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email', 'openid'],
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/signin' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

module.exports = router;
