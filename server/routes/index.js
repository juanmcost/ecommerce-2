const router = require("express").Router();
const userRouter = require("./users");
const authRouter = require("./auth");
const productRouter = require("./products");
const categoryRouter = require("./category");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/category", categoryRouter);

module.exports = router;
