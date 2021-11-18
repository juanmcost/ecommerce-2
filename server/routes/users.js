const router = require('express').Router();

const UserController = require('../controllers/usersController');
const { checkAuthAndAdmin, checkAuthAndAuthorization } = require('../middlewares/auth');

router.get('/', checkAuthAndAdmin, UserController.getAllUsers);

router.get('/:id', checkAuthAndAdmin, UserController.getUser);

router.put('/:id', checkAuthAndAuthorization, UserController.editUser);

router.put('/admin/set/:id', checkAuthAndAdmin, UserController.setAdmin);

router.put('/admin/unset/:id', checkAuthAndAdmin, UserController.unsetAdmin);

router.delete('/:id', checkAuthAndAuthorization, UserController.deleteUser);

module.exports = router;
