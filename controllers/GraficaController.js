const connection = require("../config/bd");
module.exports = {
    getSpecific: (req, res) => {
        try {
          const { id_user,categoria } = req.params;
          const sql = "SELECT fecha_pts, categoria, puntaje FROM ag_agenda WHERE id_user= ? AND categoria = ? ORDER BY `fecha_pts` DESC LIMIT 7";
          connection.query(sql, [id_user, categoria], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
              res.status(200).json(results);
              console.log(results);
            } else {
              res.status(404).json([])
            }
          });
        } catch (ex) {
          console.log(ex);
          res.status(500).json({ error: "Ha ocurrido un error" });
        }
      },
      getDiaTotal: (req, res) => {
        try {
          const { id_user } = req.params;
          const sql = "SELECT sum(puntaje), fecha_pts, categoria, puntaje FROM ag_agenda WHERE id_user= ? GROUP BY DAY(fecha_pts) ORDER BY `fecha_pts` ASC LIMIT 7";
          connection.query(sql, [id_user], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
              res.status(200).json(results);
              console.log(results);
            } else {
              res.status(404).json([])
            }
          });
        } catch (ex) {
          console.log(ex);
          res.status(500).json({ error: "Ha ocurrido un error" });
        }
      },
    
      getSemana: (req, res) => {
        try {
          //const { id_user,categoria } = req.params;
          const { id_user,categoria } = req.params;
          //const sql = "SELECT date_format(`fecha`, '%w'), puntaje FROM ag_puntuacion WHERE`categoria`='Deporte' ORDER BY fecha ASC";
         const sql = "SELECT SUM(`puntaje`), WEEK(`fecha_pts`,0), fecha_pts FROM ag_agenda WHERE id_user = ? AND categoria = ? GROUP BY WEEK(`fecha_pts`,0) ORDER BY id_agenda DESC LIMIT 8";
          connection.query(sql,[id_user, categoria], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
              res.status(200).json(results);
              console.log(results);
            } else {
              res.status(404).json([])
            }
          });
        } catch (ex) {
          console.log(ex);
          res.status(500).json({ error: "Ha ocurrido un error" });
        }
      },
      getSemanaTotal: (req, res) => {
        try {
          const { id_user } = req.params;
         const sql = "SELECT SUM(`puntaje`), WEEK(`fecha_pts`,0), fecha_pts FROM ag_agenda WHERE id_user = ?  GROUP BY WEEK(`fecha_pts`,0) ORDER BY id_agenda DESC LIMIT 8";
          connection.query(sql,[id_user], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
              res.status(200).json(results);
              console.log(results);
            } else {
              res.status(404).json([])
            }
          });
        } catch (ex) {
          console.log(ex);
          res.status(500).json({ error: "Ha ocurrido un error" });
        }
      },
      getMes: (req, res) => {
        try {
          const { id_user,categoria } = req.params;
          const sql = "SELECT SUM(`puntaje`), MONTH(`fecha_pts`), categoria FROM ag_agenda WHERE id_user = ? AND categoria = ? GROUP BY MONTH(`fecha_pts`)";
          connection.query(sql,[id_user, categoria], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
              res.status(200).json(results);
              console.log(results);
            } else {
              res.status(404).json([])
            }
          });
        } catch (ex) {
          console.log(ex);
          res.status(500).json({ error: "Ha ocurrido un error" });
        }
      },
      getMesTotal: (req, res) => {
        try {
          const { id_user } = req.params;
          const sql = "SELECT SUM(`puntaje`), MONTH(`fecha_pts`), categoria FROM ag_agenda WHERE id_user = ?  GROUP BY MONTH(`fecha_pts`)";
          connection.query(sql,[id_user], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
              res.status(200).json(results);
              console.log(results);
            } else {
              res.status(404).json([])
            }
          });
        } catch (ex) {
          console.log(ex);
          res.status(500).json({ error: "Ha ocurrido un error" });
        }
      },
};
