const router = require('express').Router();
const productsController = require('../controllers/productsController');
const auth = require('../middlewares/auth');

router.get('/', productsController.getAllProduct);

<<<<<<< HEAD
router.get('/category/:tag', productsController.getTags);
=======
<<<<<<< HEAD
router.get("/:tag", productsController.getTags);

router.get("/:id", productsController.getProduct);

router.get("/search:title", productsController.getProductTitle);

//admin
router.post("/add", auth.checkAuth, productsController.addProduct);
=======
router.get("/category/:tag", productsController.getTags);
>>>>>>> main

router.get('/:id', productsController.getProduct);

router.get('/admin/:title', productsController.getProductByTitle);

router.get('/search/:title', productsController.getProductLike);

// user logueado

router.put('/review/:id', auth.checkAuth, productsController.addReview);

router.put('/appreciation/:id', auth.checkAuth, productsController.addAppreciation);

//router.put("/")

//admin
<<<<<<< HEAD
router.post('/add', auth.checkAuthAndAdmin, productsController.addProduct);
=======
router.post("/add", auth.checkAuthAndAdmin, productsController.addProduct);
>>>>>>> back
>>>>>>> main

router.put('/:id', auth.checkAuthAndAdmin, productsController.modifyProduct);

router.delete('/:id', auth.checkAuthAndAdmin, productsController.removeProduct);

module.exports = router;
