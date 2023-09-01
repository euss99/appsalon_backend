import User from "../models/User.js";
import { sendEmailVerification } from "../emails/authEmailService.js";
import { generateJWT } from "../utils/index.js";

const registerUser = async (req, res) => {
  // Valida todos los campos
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");

    return res.status(400).json({
      msg: error.message,
    });
  }

  const { name, email, password } = req.body;
  // Evitar registros duplicados
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    const error = new Error("Usuario ya registrado");

    return res.status(400).json({
      msg: error.message,
    });
  }

  // Validar la extensión del password (mínimo 8 caracteres)
  const MIN_PASSWORD_LENGTH = 8;
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(
      `El password debe contener mínimo ${MIN_PASSWORD_LENGTH} caracteres`
    );

    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const user = new User(req.body); // Crea una instancia
    const result = await user.save(); // Almacena en la BD

    // Enviar email de verificación
    sendEmailVerification(result);

    res.status(200).json({
      msg: "El usuario se creó correctamente, revisa tu email",
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyAccount = async (req, res) => {
  const { token } = req.params; // req.params es para obtener los parámetros de la URL

  const user = await User.findOne({ token: token }); // Busca el usuario por el token
  if (!user) {
    const error = new Error("Hubo un error, token no válido");

    return res.status(401).json({
      msg: error.message,
    });
  }

  // Si el usuario es valido, confirmar la cuenta
  try {
    user.verified = true; // Cambia el estado de la cuenta a verificada
    user.token = ""; // Elimina el token

    await user.save(); // Guarda los cambios en la BD

    res.status(200).json({
      msg: "La cuenta se verificó correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");

    return res.status(400).json({
      msg: error.message,
    });
  }

  const { email, password } = req.body;
  // Revisar que el usuario exista
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");

    return res.status(401).json({
      msg: error.message,
    });
  }

  // Revisar si el usuario confirmo su cuenta
  if (!user.verified) {
    const error = new Error("Tu cuenta no ha sido confirmada aún");

    return res.status(401).json({
      msg: error.message,
    });
  }

  // Comprobar el password
  if (await user.checkPassword(password)) {
    const token = generateJWT(user._id);

    res.json({
      token: token,
    });
  } else {
    const error = new Error("El password es incorrecto");

    return res.status(401).json({
      msg: error.message,
    });
  }
};

const userAuth = async (req, res) => {
  const { user } = req; // req.user es el usuario que se guardo en el middleware

  res.json({
    user: user,
  }); // Devuelve el usuario
};

export { registerUser, verifyAccount, loginUser, userAuth };
