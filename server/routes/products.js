const router = require("express").Router();
const productsController = require("../controllers/productsController");
const auth = require("../middlewares/auth");

router.get("/", productsController.getAllProduct);

router.get("/:tag", productsController.getTags);

router.get("/:id", productsController.getProduct);

router.get("/search:title", productsController.getProductTitle);

//admin
router.post("/add", auth.checkAuth, productsController.addProduct);

router.put("/:id", auth.checkAuthAndAdmin, productsController.modifyProduct);

router.delete("/:id", auth.checkAuthAndAdmin, productsController.removeProduct);

module.exports = router;
