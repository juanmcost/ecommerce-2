const router = require('express').Router();

const AuthController = require('../controllers/authController');

// Register User
router.post('/signup', AuthController.register);
router.post('/signin', AuthController.login);

module.exports = router;
