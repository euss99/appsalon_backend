import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { db } from "./config/db.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import appointmentRoutes from "./routes/appointmentRoutes.js"

// Variables de entorno
dotenv.config();

// Configurar app
const app = express();

// Leer datos via body
app.use(express.json());

// Conectar a la BD
db();

// Configurar CORS
const whiteList = [process.env.FRONTEND_URL];

// Esto es para que postman pueda hacer las peticiones
if (process.argv[2] === "--postman") {
  whiteList.push(undefined);
}

const corsOptions = {
  origin: function (origin, callback) {
    // origin es la url que esta haciendo la petición
    // callback es la función que se ejecuta después de validar
    if (whiteList.includes(origin)) {
      // Permite la conexión
      callback(null, true);
    } else {
      // No permitir la conección
      callback(new Error("Error de CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Definir una ruta
app.use("/api/services", servicesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// Definir puerto
const PORT = process.env.PORT || 4000;

// Arrancar la app
app.listen(PORT, () => {
  console.log(
    colors.blue("El servidor se esta ejecutando en el puerto: ") +
      colors.blue.bold(PORT)
  );
});
