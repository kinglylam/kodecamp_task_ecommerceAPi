const router = require("express").Router();

const ProductController = require("../controllers/product");

router.route('/')
       .post( ProductController.createProduct)
       .get(ProductController.getAllProduct)
       .get(ProductController.filterProduct);
router.route("/:id") 
       .get(ProductController.getOneProduct)
       .put(ProductController.updateProduct)
       .delete(ProductController.deleteProduct);


module.exports = router;

