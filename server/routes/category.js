const router = require("express").Router();
const auth = require("../middlewares/auth");
const categoryControllers = require("../controllers/category");

router.delete("/remove", auth.checkAuth, categoryControllers.removeCategory);

module.exports = router;
