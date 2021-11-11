const router = require('express').Router();
const passport = require('passport');

const AuthController = require('../controllers/authController');
const { checkAuth } = require('../middlewares/auth');

// Register User
router.post('/signup', AuthController.register);

router.post('/signin', passport.authenticate('local'), AuthController.login);

router.get('/me', checkAuth, AuthController.login);

router.get('/logout', checkAuth, AuthController.logOut);

module.exports = router;
