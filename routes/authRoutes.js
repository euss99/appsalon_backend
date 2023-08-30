import express from "express";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

// Rutas de autenticación y registro de usuario
router.post("/register", registerUser);

export default router;
