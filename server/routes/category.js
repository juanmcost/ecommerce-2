const router = require("express").Router();
const auth = require("../middlewares/auth");
const categoryControllers = require("../controllers/categoryController");

router.put("/add/:id", checkAuthAndAdmin, categoryController.addCategory);

router.delete("/remove", checkAuthAndAdmin, categoryController.removeCategory);

router.put("/edit/:tag", auth.checkAuthAndAdmin, categoryControllers.editCategory);

module.exports = router;
