const connection = require("../config/bd");

module.exports = {
    getSpecific: (req, res) => {
        try {
          const { user } = req.params;
          const sql = "SELECT * FROM ag_agenda where id_agenda = ?";
          connection.query(sql, [user], (error, results) => {
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
    getAll: (req, res) => {
        try {
          const { page: bodyPage = 1, limit = 10 } = req.body;
          let page = bodyPage - 1;
          let sql = `SELECT count(*) FROM ag_dias;`;
          connection.query(sql, (error, results) => {
            if (error) throw error;
            let count = results[0]["count(*)"];
            let numberOfPages = Math.ceil(count / limit);
    
            sql = `SELECT * FROM ag_dias ORDER BY id DESC LIMIT ${limit} OFFSET ${
              page * limit
            } `;
            connection.query(sql, (error, results) => {
              if (error) throw error;
              if (results.length > 0) {
                res.status(200).json({
                  data: results,
                  count,
                  numberOfPages,
                  page,
                  sql,
                });
              } else {
                res.status(404).json([]);
              }
            });
          });
        } catch (ex) {
          console.log(ex);
          res.status(500).json({ error: "Ha ocurrido un error" });
        }
      },
      updateDias: (req, res) => {
        try {
          //const {id_actividad} = req.params;
          const {id_actividad, lunes, martes,miercoles, jueves, viernes, sabado, domingo, categoria} = req.body;
          connection.query(
            "UPDATE ag_agenda SET id_agenda = ?, lunes = ?, martes = ?, miercoles = ?, jueves = ?, viernes = ?, sabado = ?, domingo = ?, categoria = ? WHERE id_agenda = ?",
            [id_actividad,lunes, martes, miercoles, jueves, viernes, sabado, domingo, categoria, id_actividad ],
            (error, results) => {
              if (error) throw error;
              console.log("Actualizado correctamente");
              res.json({ msg: "Actividad Actualizado" });
            }
          );
        } catch (err) {
          console.log({ err });
        }
      },
};