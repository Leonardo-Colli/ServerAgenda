const cors = require("cors");

const express = require("express");
const actividades = require("./routes/actividades");
const citas = require("./routes/citas");
const dias = require("./routes/dias");
const tareas = require("./routes/tareas");
const puntacion = require("./routes/puntuacion");
const usuarios = require ("./routes/users");
const grafica = require ("./routes/grafica");

const PORT = process.env.port || 8080;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api", actividades);
app.use("/api", citas);
app.use("/api", dias);
app.use("/api", tareas);
app.use("/api", puntacion);
app.use("/api", usuarios);
app.use("/api", grafica);
app.listen(PORT, () => {
    console.log("Server running on port 8080");
  });