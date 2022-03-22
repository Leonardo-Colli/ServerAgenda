const connection = require("../config/bd");

module.exports = {
    getSpecific: (req, res) => {
        try {
          const { user } = req.params;
          const sql = "SELECT * FROM ag_agenda where id_user = ? AND tipo = 'Cita'";
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
          let sql = `SELECT count(*) FROM ag_actividades;`;
          connection.query(sql, (error, results) => {
            if (error) throw error;
            let count = results[0]["count(*)"];
            let numberOfPages = Math.ceil(count / limit);
    
            sql = `SELECT * FROM ag_citas ORDER BY id DESC LIMIT ${limit} OFFSET ${
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
      addCitas: async (req, res) => {
        try {
          const {  id_user, titulo, descripcion, hora, fecha, categoria, puntaje, fecha_pts, tipo } = req.body;
          console.log("post");
              const sql =
                "INSERT INTO ag_agenda \
              (  id_user, titulo, descripcion, hora, fecha, categoria, tipo,  puntaje, fecha_pts)\
              VALUES(?,?,?,?,?,?,?,?,?)";
              connection.query(
                sql,
                [ id_user, titulo, descripcion, hora, fecha, categoria, tipo, puntaje, fecha_pts],
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
      /*addCitas: async (req, res) => {
        try {
          const { id_citas, id_user, titulo, descripcion, hora, fecha, categoria, puntaje, fecha_pts } = req.body;
          console.log("post");
              const sql =
                "INSERT INTO ag_citas \
              ( id_citas, id_user, titulo, descripcion, hora, fecha, categoria, puntaje, fecha_pts)\
              VALUES(?,?,?,?,?,?,?,?,?)";
              connection.query(
                sql,
                [id_citas, id_user, titulo, descripcion, hora, fecha, categoria, puntaje, fecha_pts],
                (error, results) => {
                  if (error) throw error;
                  res.status(200).json(results);
                }
              );
        } catch (ex) {
          console.log(ex);
          res.status(500).json({ error: "Ha ocurrido un error" });
        }
      },*/
      updateCitas: (req, res) => {
        try {
          //const {id_actividad} = req.params;
          const {id_citas, id_user, titulo, descripcion, hora, fecha,categoria} = req.body;
          connection.query(
            "UPDATE ag_agenda SET id_agenda = ?, id_user = ?, titulo = ?, descripcion = ?, hora = ?, fecha = ?, categoria = ? WHERE id_agenda = ?",
            [id_citas,id_user,titulo, descripcion, hora, fecha,categoria, id_citas],
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
      updateStatus: (req, res) => {
        try {
          //const {id_actividad} = req.params;
          const {id_citas, puntaje, fecha} = req.body;
          connection.query(
            "UPDATE ag_agenda SET puntaje = ?, fecha_pts = ? WHERE id_agenda = ?",
            [  puntaje, fecha, id_citas],
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
      getPuntuacion: (req, res) => {
        try {
          const { id_user, categoria } = req.params;
         // const sql = "SELECT COUNT(bueno) FROM ag_citas WHERE id_user= ? AND bueno = 1 AND categoria = ?";
          const sql = "SELECT  SUM(puntaje), categoria, puntaje FROM ag_agenda WHERE id_user= ? AND categoria = ?";
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
   
};