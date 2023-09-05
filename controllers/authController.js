import User from "../models/User.js";
import {
  sendEmailVerification,
  sendEmailPasswordReset,
} from "../emails/authEmailService.js";
import { generateJWT, uniqueToken } from "../utils/index.js";

const registerUser = async (req, res) => {
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");

    return res.status(400).json({
      msg: error.message,
    });
  }

  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    const error = new Error("Usuario ya registrado");

    return res.status(400).json({
      msg: error.message,
    });
  }

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
    const user = new User(req.body);
    const result = await user.save();

    sendEmailVerification(result);

    res.status(200).json({
      msg: "El usuario se creó correctamente, revisa tu email",
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyAccount = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ token: token });
  if (!user) {
    const error = new Error("Hubo un error, token no válido");

    return res.status(401).json({
      msg: error.message,
    });
  }

  try {
    user.verified = true;
    user.token = "";

    await user.save();

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
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");

    return res.status(401).json({
      msg: error.message,
    });
  }

  if (!user.verified) {
    const error = new Error("Tu cuenta no ha sido confirmada aún");

    return res.status(401).json({
      msg: error.message,
    });
  }

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

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");

    return res.status(401).json({
      msg: error.message,
    });
  }

  try {
    user.token = uniqueToken();
    const result = await user.save();

    sendEmailPasswordReset({
      name: result.name,
      email: result.email,
      token: result.token,
    });

    res.json({
      msg: "Se envió un email para reestablecer tu password",
    });
  } catch (error) {
    console.log(error);
  }
};

const userAuth = async (req, res) => {
  const { user } = req;

  res.json(user);
};

const adminAuth = async (req, res) => {
  const { user } = req;

  if (!user.admin) {
    const error = new Error("No tienes permisos para acceder a esta ruta");

    return res.status(401).json({
      msg: error.message,
    });
  }

  res.json(user);
};

const verifyPasswordResetToken = async (req, res) => {
  const { token } = req.params;

  const isValidToken = await User.findOne({ token: token });
  if (!isValidToken) {
    const error = new Error("Token no válido");

    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    res.json({
      msg: "Token válido",
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token: token });
  if (!user) {
    const error = new Error("Token no válido");

    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    user.token = "";
    user.password = password;
    await user.save();

    res.json({
      msg: "Password actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  registerUser,
  verifyAccount,
  loginUser,
  forgotPassword,
  userAuth,
  adminAuth,
  verifyPasswordResetToken,
  updatePassword,
};
