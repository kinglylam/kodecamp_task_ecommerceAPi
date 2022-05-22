const router = require("express").Router();

const UserController = require("../controllers/user");

router.post('/signup', UserController.signup);
router.get("/signin", UserController.signin);
router.get("/refresh", UserController.refreshAccessToken);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
       

module.exports = router;