const router = require('express').Router();
const userRouter = require('./users');
const authRouter = require('./auth');
const cartRouter = require('./cart');
const orderRouter = require('./order');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);

module.exports = router;
