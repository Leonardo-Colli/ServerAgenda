const connection = require("../config/bd");

module.exports = {
    getSpecific: (req, res) => {
        try {
          const { user } = req.params;
          const sql = "SELECT * FROM ag_agenda where id_user = ? AND tipo = 'Actividad'";
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
      getSpecificTime: (req, res) => {
        try {
          const { id_actividad } = req.params;
          const sql = "SELECT lunes, martes, miercoles, jueves, viernes, sabado, domingo FROM ag_agenda  where id_agenda = ?";
          connection.query(sql, [id_actividad], (error, results) => {
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
          let sql = `SELECT count(*) FROM ag_agenda WHERE tipo = 'Actividad';`;
          connection.query(sql, (error, results) => {
            if (error) throw error;
            let count = results[0]["count(*)"];
            let numberOfPages = Math.ceil(count / limit);
    
            sql = `SELECT * FROM ag_agenda ORDER BY id DESC LIMIT ${limit} OFFSET ${
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
      addActividad: async (req, res) => {
        try {
          const {id_user, titulo, descripcion, hora, categoria,lunes , martes, miercoles, jueves, viernes, sabado, domingo, fecha, puntaje, tipo} = req.body;
          console.log("post");
              const sql =
                "INSERT INTO ag_agenda \
              ( id_user, titulo, descripcion, hora, categoria, tipo,puntaje, fecha_pts, lunes, martes, miercoles, jueves, viernes, sabado, domingo)\
              VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
              connection.query(
                sql,
                [ id_user, titulo, descripcion, hora, categoria,tipo, puntaje, fecha, lunes, martes, miercoles, jueves, viernes, sabado, domingo],
                (error, results) => {
                  if (error) throw error;
                  res.status(200).json(results);
                  console.log(results.insertId);
                }
              );
        } catch (ex) {
          console.log(ex);
          res.status(500).json({ error: "Ha ocurrido un error" });
        }
      },
     /* addActividad: async (req, res) => {
        try {
          const {id_user, titulo, descripcion, hora, categoria,lunes , martes, miercoles, jueves, viernes, sabado, domingo, fecha, puntaje} = req.body;
          console.log("post");
              const sql =
                "INSERT INTO ag_actividad \
              ( id_user, titulo, descripcion, hora, categoria, puntaje, fecha)\
              VALUES(?,?,?,?,?,?,?)";
              connection.query(
                sql,
                [ id_user, titulo, descripcion, hora, categoria, puntaje, fecha],
                (error, results) => {
                  if (error) throw error;
                  res.status(200).json(results);
                  console.log(results.insertId);
                  const sql2 =
                  "INSERT INTO ag_dias \
                ( lunes, martes, miercoles, jueves, viernes, sabado, domingo, categoria)\
                VALUES(?,?,?,?,?,?,?,?)";
                connection.query(
                  sql2,[
                    lunes,
                    martes,
                    miercoles,
                    jueves,
                    viernes,
                    sabado,
                    domingo,
                    categoria,
                  ]
                );
                }
              );
        } catch (ex) {
          console.log(ex);
          res.status(500).json({ error: "Ha ocurrido un error" });
        }
      },*/
      updateActividad: (req, res) => {
        try {
          //const {id_actividad} = req.params;
          const {id_actividad, id_user, titulo, descripcion, hora, categoria} = req.body;
          connection.query(
            "UPDATE ag_agenda SET id_agenda = ?, id_user = ?, titulo = ?, descripcion = ?, hora = ?, categoria = ? WHERE id_agenda = ?",
            [id_actividad,id_user,titulo, descripcion, hora, categoria, id_actividad],
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
          const {id_actividad, puntaje,fecha} = req.body;
          connection.query(
            "UPDATE ag_agenda SET  puntaje = ?, fecha_pts = ? WHERE id_agenda = ?",
            [   puntaje, fecha,id_actividad],
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