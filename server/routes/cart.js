const router = require('express').Router();

const CartController = require('../controllers/cartController');
const { checkAuth, checkAuthAndAdmin, checkAuthAndAuthorization } = require('../middlewares/auth');

router.get('/', checkAuthAndAdmin, CartController.allCarts);

router.get('/:id', checkAuthAndAuthorization, CartController.userCart);

router.post('/', checkAuth, CartController.createCart);

router.put('/:id', checkAuthAndAuthorization, CartController.updateCart);

router.delete('/:id', checkAuthAndAuthorization, CartController.deleteCart);

module.exports = router;
