const router = require('express').Router();

const UserController = require('../controllers/usersController');
const { checkAuthAndAdmin, checkAuthAndAuthorization } = require('../middlewares/auth');

router.get('/', checkAuthAndAdmin, UserController.getAllUsers);

router.get('/:id', checkAuthAndAdmin, UserController.getUser);

router.put('/:id', checkAuthAndAuthorization, UserController.editUser);

router.put('/admin/:id', checkAuthAndAdmin, UserController.setAdmin);

router.delete('/:id', checkAuthAndAuthorization, UserController.deleteUser);

module.exports = router;
