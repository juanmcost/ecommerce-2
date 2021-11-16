const router = require("express").Router();

const UserController = require("../controllers/usersController");
const { checkAuthAndAdmin, checkAuthAndAuthorization, checkAuth } = require("../middlewares/auth");

router.get("/", checkAuth, UserController.getAllUsers);

router.get("/:id", checkAuthAndAdmin, UserController.getUser);

router.put("/:id", checkAuthAndAuthorization, UserController.editUser);

router.put("/admin/:id", checkAuthAndAdmin, UserController.setAdmin);

//router.delete("/:id", checkAuth, UserController.deleteUser);
router.delete("/:id", checkAuth, UserController.deleteUser1);

module.exports = router;
