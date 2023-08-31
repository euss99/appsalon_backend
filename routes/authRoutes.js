import express from "express";
import {
  registerUser,
  verifyAccount,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

// Rutas de autenticación y registro de usuario
router.post("/register", registerUser);
router.get("/verify/:token", verifyAccount);
router.post("/login", loginUser);

export default router;
