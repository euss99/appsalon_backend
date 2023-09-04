import express from "express";
import {
  registerUser,
  verifyAccount,
  loginUser,
  userAuth,
  forgotPassword,
  verifyPasswordResetToken,
  updatePassword,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas de autenticación y registro de usuario
router.post("/register", registerUser);
router.get("/verify/:token", verifyAccount);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.get("/forgot-password/:token", verifyPasswordResetToken);
router.patch("/forgot-password/:token", updatePassword);

// Area privada - Requiere un JWT
router.get("/user", authMiddleware, userAuth);

export default router;
