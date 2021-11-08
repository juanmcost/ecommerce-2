const router = require('express').Router();
const userRouter = require('./users');
const authRouter = require('./auth');
const checkAuth = require('../middlewares/auth');

router.use('/auth', authRouter);
router.use('/user', checkAuth, userRouter);

module.exports = router;
