const router = require("express").Router();
const controller = require("../controllers/GraficaController");
router.get("/grafica/:id_user/:categoria", controller.getSpecific);
router.get("/grafica/:id_user", controller.getDiaTotal);
router.get("/grafica/semana/:id_user/:categoria", controller.getSemana);
router.get("/puntuacion/totalsemana/:id_user", controller.getSemanaTotal);
router.get("/grafica/mes/:id_user/:categoria", controller.getMes);
router.get("/puntuacion/total/:id_user", controller.getMesTotal);
module.exports = router;