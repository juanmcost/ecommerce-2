const router = require("express").Router();
const auth = require("../middlewares/auth");
const categoryControllers = require("../controllers/category");

router.put("/add/:id", auth.checkAuthAndAdmin, categoryControllers.addCategory);

router.delete("/remove", auth.checkAuthAndAdmin, categoryControllers.removeCategory);

router.put("/edit/:category", auth.checkAuth, categoryControllers.editCategory);

module.exports = router;
