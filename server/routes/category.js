const router = require("express").Router();
const auth = require("../middlewares/auth");
<<<<<<< HEAD
const categoryControllers = require("../controllers/category");

router.put("/add/:id", auth.checkAuthAndAdmin, categoryControllers.addCategory);

router.delete("/remove", auth.checkAuthAndAdmin, categoryControllers.removeCategory);

router.put("/edit/:category", auth.checkAuth, categoryControllers.editCategory);
=======
const categoryController = require("../controllers/categoryController");

router.put("/add/:id", auth.checkAuthAndAdmin, categoryController.addCategory);

router.delete("/remove", auth.checkAuthAndAdmin, categoryController.removeCategory);

router.put("/edit/:tag", auth.checkAuthAndAdmin, categoryController.editCategory);
>>>>>>> back

module.exports = router;
