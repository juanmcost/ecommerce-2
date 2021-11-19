const router = require("express").Router();

const UserController = require("../controllers/usersController");
const { checkAuthAndAdmin, checkAuthAndAuthorization, checkAuth } = require("../middlewares/auth");

router.get("/", checkAuth, UserController.getAllUsers);

router.get("/:id", checkAuth, UserController.getUser);

router.put("/:id", checkAuthAndAuthorization, UserController.editUser);

router.put("/admin/set/:id", checkAuthAndAdmin, UserController.setAdmin);

router.put("/admin/unset/:id", checkAuthAndAdmin, UserController.unsetAdmin);

router.put("/profile/edit", checkAuthAndAuthorization, UserController.editMyAccount);

router.delete("/:id", checkAuthAndAdmin, UserController.deleteUser);
router.delete("/profile/:id", checkAuthAndAuthorization, UserController.deleteUser);

module.exports = router;
