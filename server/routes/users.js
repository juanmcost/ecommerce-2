const UserController = require('../controllers/usersController');

const router = require('express').Router();

router.get('/', UserController.getUser);

module.exports = router;
