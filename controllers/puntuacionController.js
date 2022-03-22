const connection = require("../config/bd");

module.exports = {
    getSpecific: (req, res) => {
        try {
          const { user } = req.params;
          const sql = "SELECT * FROM ag_puntuacion where id_user = ?";
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
          let sql = `SELECT count(*) FROM ag_puntuacion;`;
          connection.query(sql, (error, results) => {
            if (error) throw error;
            let count = results[0]["count(*)"];
            let numberOfPages = Math.ceil(count / limit);
    
            sql = `SELECT * FROM ag_actividades ORDER BY id DESC LIMIT ${limit} OFFSET ${
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
      addPuntuacion: async (req, res) => {
        try {
          const { id_user, categoria, puntaje } = req.body;
          console.log("post");
              const sql =
                "INSERT INTO ag_puntuacion \
              ( id_user, categoria, puntaje)\
              VALUES(?,?,?,?,?,?,?,?,?)";
              connection.query(
                sql,
                [id_user, categoria, puntaje],
                (error, results) => {
                  if (error) throw error;
                  res.status(200).json(results);
                }
              );
        } catch (ex) {
          console.log(ex);
          res.status(500).json({ error: "Ha ocurrido un error" });
        }
      },
      updateStatus: (req, res) => {
        try {
          const {id_user, fecha, puntaje} = req.body;
          connection.query(
            "UPDATE ag_puntuacion SET  fecha = ?, puntaje = ? WHERE id_user = ?",
            [  fecha, puntaje, id_user],
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