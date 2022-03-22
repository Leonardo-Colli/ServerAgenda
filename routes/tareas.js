const router = require("express").Router();
const controller = require("../controllers/tareasController");
//router.get("fecth/tareas", controller.getAll);
router.get('/tareas/:user',controller.getSpecific);
router.post("/tareas", controller.addTareas);
router.put("/tareas/put/:user", controller.updateTareas);
router.delete("/tareas/delete/:user", controller.delete);
module.exports = router;