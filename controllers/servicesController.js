import { validateObjectId, handleNotFoundError } from "../utils/index.js";
import Services from "../models/Services.js";

const createServices = async (req, res) => {
  if (Object.values(req.body).includes("")) {
    return handleNotFoundError("Todos los campos son obligatorios", res);
  }

  try {
    const service = new Services(req.body);
    const result = await service.save();

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (error) {
    console.log(error);
  }
};

const getServicesById = async (req, res) => {
  const { id } = req.params;
  if (validateObjectId(id, res)) return;

  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError("El servicio no existe", res);
  }

  res.json(service);
};

const updateService = async (req, res) => {
  const { id } = req.params;
  if (validateObjectId(id, res)) return;

  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError("El servicio no existe", res);
  }

  const { name, price } = req.body;
  service.name = name || service.name;
  service.price = price || service.price;

  try {
    await service.save();
    res.json({
      msg: "El servicio se actualizó correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  if (validateObjectId(id, res)) return;

  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError("El servicio no existe", res);
  }

  try {
    await service.deleteOne();
    res.json({
      msg: "El servicio se eliminó correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  createServices,
  getAllServices,
  getServicesById,
  updateService,
  deleteService,
};
