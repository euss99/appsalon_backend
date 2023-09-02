import express from "express";
import {
  createAppointment,
  getAppointmentsByDate,
  getAppointmentById,
} from "../controllers/appointmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* 
    Las citas solamente se pueden generar si el usuario esta autenticado, por lo que
    tenemos que utilizar el middleware de autenticación, para comprobar que el usuario
    esta autenticado, y si lo esta, entonces podemos crear la cita.
*/
router.post("/", authMiddleware, createAppointment);
router.get("/", authMiddleware, getAppointmentsByDate);
router.get("/:id", authMiddleware, getAppointmentById);

export default router;
