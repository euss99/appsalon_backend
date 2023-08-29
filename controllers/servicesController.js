import { validateObjectId, handleNotFoundError } from "../utils/index.js";
import Services from "../models/Services.js";

const createServices = async (req, res) => {
  // Validación de campos
  if (Object.values(req.body).includes("")) {
    return handleNotFoundError("Todos los campos son obligatorios", res);
  }

  try {
    const service = new Services(req.body); // Creando una instancia del modelo enviandole los datos
    const result = await service.save(); // Almacenando el resultado en la BD de Mongo

    res.json(result); // Nos devuelve el resultado ya creado en la BD
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
  // Validar que sea de tipo ObjectId
  if (validateObjectId(id, res)) return;

  // Validar que exista el servicio con ese ObjectId
  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError("El servicio no existe", res);
  }

  // Mostrar el servicio
  res.json(service);
};

const updateService = async (req, res) => {
  const { id } = req.params;
  // Validar que sea de tipo ObjectId
  if (validateObjectId(id, res)) return;

  // Validar que exista el servicio con ese ObjectId
  const service = await Services.findById(id);
  if (!service) {
    return handleNotFoundError("El servicio no existe", res);
  }

  // Escribimos en el objeto los valores nuevos
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
  // Validar que sea de tipo ObjectId
  if (validateObjectId(id, res)) return;

  // Validar que exista el servicio con ese ObjectId
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
