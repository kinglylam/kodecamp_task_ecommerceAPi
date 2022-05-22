const router = require("express").Router();

const UserController = require("../controllers/user");

router.post('/', UserController.signup);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
       

module.exports = router;