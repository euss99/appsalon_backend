import { services } from "../data/beautyServices.js";
import Services from "../models/Services.js";

const createServices = async (req, res) => {
  // Validación de campos
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");

    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const service = new Services(req.body); // Creando una instancia del modelo enviandole los datos
    const result = await service.save(); // Almacenando el resultado en la BD de Mongo

    res.json(result); // Nos devuelve el resultado ya creado en la BD
  } catch (error) {
    console.log(error);
  }
};

const getAllServices = (req, res) => {
  res.json(services);
};

const getServicesById = (req, res) => {
  // Validar que sea un ObjectId

  // Validar que exista el servicio con ese ObjectId

  // Mostrar el servicio
};

export { createServices, getAllServices, getServicesById };
