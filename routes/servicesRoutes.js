import express from "express";
import {
  createServices,
  getAllServices,
  getServicesById,
} from "../controllers/servicesController.js";

const router = express.Router();

router.post("/", createServices);
router.get("/", getAllServices);
router.get("/:id", getServicesById);

export default router;
