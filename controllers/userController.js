const connection = require("../config/bd");

module.exports = {
    getAll: (req, res) => {
        try {
          const { page: bodyPage = 1, limit = 10 } = req.body;
          let page = bodyPage - 1;
          let sql = `SELECT count(*) FROM users;`;
          connection.query(sql, (error, results) => {
            if (error) throw error;
            let count = results[0]["count(*)"];
            let numberOfPages = Math.ceil(count / limit);
    
            sql = `SELECT * FROM users ORDER BY id_user DESC LIMIT ${limit} OFFSET ${
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
      addUser: async (req, res) => {
        try {
          const {  id_user } = req.body;
          console.log("post");
              const sql =
                "INSERT INTO users \
              (id_user)\
              VALUES(?)";
              connection.query(
                sql,
                [ id_user],
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

};