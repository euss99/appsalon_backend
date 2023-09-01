import Appointment from "../models/Appointment.js";

const createAppointment = async (req, res) => {
  const appointment = req.body; // Obtenemos los datos de la cita
  appointment.user = req.user._id.toString(); // Almacenamos el id del usuario que creo la cita en formato string

  try {
  } catch (error) {
    console.log(error);
  }
};

export { createAppointment };
