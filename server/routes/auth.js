const router = require('express').Router();
const passport = require('passport');
const axios = require('axios');

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
    }),
    (req, res) => {
        res.redirect('http://localhost:3000/home');
    }
);

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/signin' }), AuthController.login);

router.get('/facebook', passport.authenticate('facebook'));

router.get(
    '/facebook/secret',
    passport.authenticate('facebook', { failureRedirect: '/login' }),

    AuthController.login
);

router.get('/userface', (req, res) => {
    if (req.user) res.send(req.user);

    res.send('aca no hay nada');
});
module.exports = router;
