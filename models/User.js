import mongoose from "mongoose";
import { uniqueToken } from "../utils/index.js";

// Definición del esquema para el modelo de usuario
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Elimina espacios en blanco alrededor del nombre
  },
  password: {
    type: String,
    required: true,
    trim: true, // Elimina espacios en blanco alrededor de la contraseña
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Garantiza que no se repita el email en la base de datos
    lowercase: true, // Convierte todo en minusculas
  },
  token: {
    type: String,
    default: () => uniqueToken(), // Genera un token único al crear un usuario
  },
  verified: {
    type: Boolean,
    default: false, // Al crear un usuario, no está verificado por defecto
  },
  admin: {
    type: Boolean,
    default: false, // Los usuarios creados no son administradores por defecto
  },
});

// Creación del modelo de usuario
const User = mongoose.model("User", userSchema);
export default User; // Exportación del modelo
