import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await User.findById(decoded.id).select(
        "-password -verified -token -__v"
      );

      req.user = user;
      next();
    } catch {
      const error = new Error("Token no válido");

      return res.status(403).json({
        msg: error.message,
      });
    }
  } else {
    const error = new Error("Token inexistente o no es válido");

    return res.status(403).json({
      msg: error.message,
    });
  }
};

export default authMiddleware;
