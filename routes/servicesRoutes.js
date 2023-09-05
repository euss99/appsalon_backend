import express from "express";
import {
  createServices,
  getAllServices,
  getServicesById,
  updateService,
  deleteService,
} from "../controllers/servicesController.js";

const router = express.Router();

router.route("/").get(getAllServices).post(createServices);
router
  .route("/:id")
  .get(getServicesById)
  .put(updateService)
  .delete(deleteService);

export default router;
