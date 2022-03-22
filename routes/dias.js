const router = require("express").Router();
const controller = require("../controllers/diasController");
//router.get("/dias", controller.getAll);
router.get('/dias/:user',controller.getSpecific);
router.put('/dias/put/:user', controller.updateDias);
module.exports = router;