import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns";
/*
  parse: Convierte una fecha de string a date
  formatISO: Convierte una fecha a formato ISO
  startOfDay: Convierte una fecha a las 00:00:00
  endOfDay: Convierte una fecha a las 23:59:59
  isValid: Comprueba si una fecha es valida
*/
import Appointment from "../models/Appointment.js";

const createAppointment = async (req, res) => {
  const appointment = req.body; // Obtenemos los datos de la cita
  appointment.user = req.user._id.toString(); // Almacenamos el id del usuario que creo la cita en formato string

  try {
    const newAppointment = new Appointment(appointment);
    await newAppointment.save();

    res.json({
      msg: "Tu reservación se realizó correctamente",
    });
  } catch {
    const error = new Error("Hubo un error al crear la cita");

    return res.status(400).json({
      msg: error.message,
    });
  }
};

const getAppointmentsByDate = async (req, res) => {
  // req.query es un objeto que contiene todos los parametros que se envian por query string
  const { date } = req.query;
  const newDate = parse(date, "dd/MM/yyyy", new Date()); // Convertimos la fecha de string a date

  // Comprobamos que la fecha sea valida
  if (!isValid(newDate)) {
    const error = new Error("La fecha no valida");

    return res.status(401).json({
      msg: error.message,
    });
  }

  const isoDate = formatISO(newDate); // Convertimos la fecha a formato ISO

  try {
    // Buscará todas las citas que tengan una fecha mayor o igual a las 00:00:00 y menor o igual a las 23:59:59 del día que se envió por query string
    const appointments = await Appointment.find({
      date: {
        $gte: startOfDay(new Date(isoDate)), // Mayor o igual a las 00:00:00, $gte: greater than or equal (mayor o igual)
        $lte: endOfDay(new Date(isoDate)), // Menor o igual a las 23:59:59, $lte: less than or equal (menor o igual)
      },
    }).select("time"); // Seleccionamos que nos devuelva solamente el campo time

    res.json(appointments);
  } catch (error) {
    console.log(error);
  }
};

export { createAppointment, getAppointmentsByDate };
