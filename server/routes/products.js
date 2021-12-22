const router = require('express').Router();
const productsController = require('../controllers/productsController');
const auth = require('../middlewares/auth');

router.get('/', productsController.getAllProduct);

router.get('/category/:tag', productsController.getTags);

router.get('/:id', productsController.getProduct);

router.get('/admin/:title', productsController.getProductTitle);

router.get('/search/:title', productsController.getProductByLike);

router.get('/reviews/:id', productsController.getAllReviews);

// user logueado

router.put('/review/:id', auth.checkAuth, productsController.addReview);

router.put('/appreciation/:id', auth.checkAuth, productsController.addAppreciation);

//admin
router.post('/add', auth.checkAuthAndAdmin, productsController.addProduct);

router.put('/:id', auth.checkAuthAndAdmin, productsController.modifyProduct);

router.delete('/:id', auth.checkAuthAndAdmin, productsController.removeProduct);

module.exports = router;
