import User from "../models/User.js";

const registerUser = async (req, res) => {
  // Valida todos los campos
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");

    return res.status(400).json({
      msg: error.message,
    });
  }

  // Evitar registros duplicados
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    const error = new Error("Usuario ya registrado");

    return res.status(400).json({
      msg: error.message,
    });
  }

  // Validar la extensión del password (mínimo 8 caracteres)
  const MIN_PASSWORD_LENGTH = 8;
  if (req.body.password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(
      `El password debe contener mínimo ${MIN_PASSWORD_LENGTH} caracteres`
    );

    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const user = new User(req.body); // Crea una instancia
    await user.save(); // Almacena en la BD

    res.status(200).json({
      msg: "El usuario se creó correctamente, revisa tu email",
    });
  } catch (error) {
    console.log(error);
  }
};

export { registerUser };
