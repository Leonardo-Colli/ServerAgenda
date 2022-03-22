const router = require("express").Router();
const controller = require("../controllers/userController");
router.get('/user/all',controller.getAll);
router.post("/user", controller.addUser);
module.exports = router;