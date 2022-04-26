const router = require("express").Router();

const ProductControlller = require("../controllers/product");

router.route('/product')
       .post( ProductControlller.createProduct)
       .get(ProductControlller.getAllProduct);
router.route("/:id") 
       .get(ProductControlller.getOneProduct)
       .put(ProductControlller.updateProduct)
       .delete(ProductControlller.deleteProduct);

module.exports = router;
