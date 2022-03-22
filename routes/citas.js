const router = require("express").Router();
const controller = require("../controllers/citasController");
//router.get("fecth/citas", controller.getAll);
router.get('/citas/:user',controller.getSpecific);
router.post("/citas", controller.addCitas);
router.put("/citas/put/:user", controller.updateCitas);
router.put("/citas/putStatus/:user", controller.updateStatus);
router.delete("/citas/delete/:user", controller.delete);
router.get("/citas/bueno/:id_user/:categoria", controller.getPuntuacion);
module.exports = router;