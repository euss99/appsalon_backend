import jwt from "jsonwebtoken";
import User from "../models/User.js";
/* 
  Un middleware es una función que se ejecuta antes de que se ejecute el controlador. En este caso, 
  el middleware se encarga de verificar si el usuario esta autenticado o no. Si el usuario esta
  autenticado, se ejecuta el controlador, en caso contrario, se devuelve un error.

  Esta función se va a encargar validar y leer el token que se recibe, y si no lo tiene va a prevenir a que accedamos
  a la siguiente funcion que es el controlador. Si el token es valido, se ejecuta el controlador.

  El token se manda en el header porque es la forma más segura de enviarlo. El header es la parte de la petición
  que contiene información sobre la petición, y se manda primero antes del body.
*/

/*
  jwt.verify recibe dos parametros, el token y la clave secreta. Si el token es valido, se ejecuta el controlador,
  en caso contrario, se devuelve un error.
  Nos regresa el payload, que es la información que se guardo en el token.
*/

/*
  El req.user es el usuario que se guardo en el token, y se va a utilizar en el controlador.
*/

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization; // Leer el token del header
  const bearer = req.headers.authorization.startsWith("Bearer"); // Verificar que el token empiece con Bearer

  // Verificar si el token existe
  if (token && bearer) {
    try {
      const token = req.headers.authorization.split(" ")[1]; // Obtener el token sin la palabra Bearer
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verificar el token

      // Verificar que el usuario exista
      const user = await User.findById(decoded.id).select(
        "-password -verified -token -__v"
      ); // Obtener el usuario sin el password, el verified, el token y el __v

      req.user = user; // Guardar el usuario en el request
      next(); // Ejecutar el controlador
    } catch {
      const error = new Error("Token no válido");

      return res.status(403).json({
        msg: error.message,
      });
    }
  } else {
    const error = new Error("Token inexistente");

    return res.status(403).json({
      msg: error.message,
    });
  }
};

export default authMiddleware;
