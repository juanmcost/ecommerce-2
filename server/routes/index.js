const router = require("express").Router();
const userRouter = require("./users");
const authRouter = require("./auth");
const cartRouter = require("./cart");
const categoryRouter = require("./category");
const product = require("./products");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/cart", cartRouter);
router.use("/category", categoryRouter);
router.use("/product", product);

module.exports = router;
