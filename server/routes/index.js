const router = require('express').Router();
const userRouter = require('./users');
const authRouter = require('./auth');

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
