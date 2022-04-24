const router = require("express").Router();

const createProduct = require("../controllers/product");

router.post("/", () => createProduct);
router.get("/",  createProduct.getAllProduct);
router.get("/:id", createProduct.getOneProduct);
router.put("/:id", createProduct.updateProduct);
router.delete("/:id", createProduct.deleteProduct)

module.exports = router;

