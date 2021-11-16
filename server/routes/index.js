<<<<<<< HEAD
const router = require("express").Router();
const userRouter = require("./users");
const authRouter = require("./auth");
const productRouter = require("./products");
const categoryRouter = require("./category");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/category", categoryRouter);
=======
const router = require('express').Router();

const userRouter = require('./users');
const authRouter = require('./auth');
const cartRouter = require('./cart');
const categoryRouter = require('./category');
const productRouter = require('./products');
const orderRouter = require('./order');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
>>>>>>> back

module.exports = router;
