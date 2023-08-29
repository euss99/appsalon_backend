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

// router.get("/", getAllServices);
// router.post("/", createServices);
// router.get("/:id", getServicesById);
// router.put("/:id", updateService);
// router.delete("/:id", deleteService);

export default router;
