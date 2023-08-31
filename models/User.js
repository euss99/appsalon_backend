import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

// Middleware para hashear la contraseña antes de guardarla en la BD
userSchema.pre("save", async function (next) {
  // Verificar si la contraseña ya ha sido hasheada
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10); // Generar un salt para el hash
  this.password = await bcrypt.hash(this.password, salt); // Hashear la contraseña
});

userSchema.methods.checkPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password); // Comparar contraseñas
};

// Creación del modelo de usuario
const User = mongoose.model("User", userSchema);
export default User; // Exportación del modelo
