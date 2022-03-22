const router = require("express").Router();
const controller = require("../controllers/puntuacionController");
//router.get("fetch/puntacion", controller.getAll);
router.get('/puntuacion/:user',controller.getSpecific);
router.post("/puntuacion", controller.addPuntuacion);
router.put("/puntuacion/update/:user", controller.updateStatus);
module.exports = router;