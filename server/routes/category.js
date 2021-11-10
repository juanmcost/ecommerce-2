const router = require('express').Router();
const { checkAuthAndAdmin, checkAuth } = require('../middlewares/auth');
const categoryController = require('../controllers/categoryController');

router.put('/add/:id', checkAuthAndAdmin, categoryController.addCategory);

router.delete('/remove', checkAuthAndAdmin, categoryController.removeCategory);

router.put('/edit/:category', checkAuth, categoryController.editCategory);

module.exports = router;
