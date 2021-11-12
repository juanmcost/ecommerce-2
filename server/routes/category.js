const router = require("express").Router();
const auth = require("../middlewares/auth");
const categoryController = require("../controllers/categoryController");

router.put("/add/:id", auth.checkAuthAndAdmin, categoryController.addCategory);

router.delete("/remove", auth.checkAuthAndAdmin, categoryController.removeCategory);

router.put("/edit/:tag", auth.checkAuthAndAdmin, categoryController.editCategory);

module.exports = router;
