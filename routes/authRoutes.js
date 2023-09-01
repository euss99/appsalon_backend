import express from "express";
import {
  registerUser,
  verifyAccount,
  loginUser,
  userAuth
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas de autenticación y registro de usuario
router.post("/register", registerUser);
router.get("/verify/:token", verifyAccount);
router.post("/login", loginUser);

// Area privada - Requiere un JWT
router.get("/user", authMiddleware, userAuth);

export default router;
