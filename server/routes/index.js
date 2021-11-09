const router = require('express').Router();
const userRouter = require('./users');
const authRouter = require('./auth');
const cartRouter = require('./cart');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/cart', cartRouter);

module.exports = router;
