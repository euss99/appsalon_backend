import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { db } from "./config/db.js";
import servicesRoutes from "./routes/servicesRoutes.js";

// Variables de entorno
dotenv.config();

// Configurar app
const app = express();

// Leer datos via body
app.use(express.json());

// Conectar a la BD
db();

// Definir una ruta
app.use("/api/services", servicesRoutes);

// Definir puerto
const PORT = process.env.PORT || 4000;

// Arrancar la app
app.listen(PORT, () => {
  console.log(
    colors.blue("El servidor se esta ejecutando en el puerto: ") +
      colors.blue.bold(PORT)
  );
});
