const connection = require("../config/bd");

module.exports = {
    getSpecific: (req, res) => {
        try {
          const { user } = req.params;
          const sql = "SELECT * FROM ag_agenda where id_user = ? AND tipo = 'Tarea'";
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
          let sql = `SELECT count(*) FROM ag_tareas;`;
          connection.query(sql, (error, results) => {
            if (error) throw error;
            let count = results[0]["count(*)"];
            let numberOfPages = Math.ceil(count / limit);
    
            sql = `SELECT * FROM ag_tareas ORDER BY id DESC LIMIT ${limit} OFFSET ${
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
      addTareas: async (req, res) => {
        try {
          const { id_agenda, id_user, titulo, descripcion, categoria, tipo } = req.body;
          console.log("post");
              const sql =
                "INSERT INTO ag_agenda \
              ( id_agenda, id_user, titulo, descripcion,categoria, tipo)\
              VALUES(?,?,?,?,?,?)";
              connection.query(
                sql,
                [id_agenda, id_user,titulo, descripcion,categoria, tipo],
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
      updateTareas: (req, res) => {
        try {
          //const {id_actividad} = req.params;
          const { id_agenda, id_user, titulo, descripcion, categoria } = req.body;
          connection.query(
            "UPDATE ag_agenda SET id_agenda = ?, id_user = ?, titulo = ?, descripcion = ?, categoria = ? WHERE id_tarea = ?",
            [id_agenda, id_user,titulo, descripcion,categoria, id_agenda],
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
      delete: (req, res) => {
        try {
          const { user } = req.params;
          const sql = "DELETE FROM ag_agenda WHERE id_agenda = ?";
          connection.query(sql, [user],
            (error, results) => {
            if (error) throw error;
            console.log("Eliminado correctamente");
            res.json({ msg: "Actividad Eliminada" });
          });
        } catch (ex) {
          console.log(ex);
        }
      },
};