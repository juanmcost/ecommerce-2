const router = require("express").Router();
const auth = require("../middlewares/auth");
const categoryControllers = require("../controllers/categoryController");

router.put("/add/:id", auth.checkAuthAndAdmin, categoryControllers.addCategory);

router.delete("/remove", auth.checkAuthAndAdmin, categoryControllers.removeCategory);

router.put("/edit/:tag", auth.checkAuthAndAdmin, categoryControllers.editCategory);

module.exports = router;
