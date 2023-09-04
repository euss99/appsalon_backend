import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns";
import {
  validateObjectId,
  handleNotFoundError,
  convertToPPPPDate,
} from "../utils/index.js";
import {
  sendEmailNewAppointmentToAdmin,
  sendEmailUpdateAppointmentToAdmin,
  sendEmailCancelledAppointmentToAdmin,
} from "../emails/appointmentEmailService.js";
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
    const result = await newAppointment.save();

    // Enviamos el email
    await sendEmailNewAppointmentToAdmin({
      date: convertToPPPPDate(result.date),
      time: result.time,
    });

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

const getAppointmentById = async (req, res) => {
  const { id } = req.params;

  // Validar que sea un ObjectId valido
  if (validateObjectId(id, res)) return;

  // Validar que la cita exista
  const appointment = await Appointment.findById(id).populate("services");
  if (!appointment) {
    return handleNotFoundError("La cita no existe", res);
  }

  // Validar si la persona que esta autenticada es diferente a la que creo la cita
  // appointment.user es la persona que creo la cita
  // req.user._id es la persona que esta autenticada
  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tiene los permisos para ver esta cita");

    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    res.json(appointment);
  } catch (error) {
    console.log(error);
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const appointment = await Appointment.findById(id).populate("services");
  if (!appointment) {
    return handleNotFoundError("La cita no existe", res);
  }

  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tiene los permisos para ver esta cita");

    return res.status(403).json({
      msg: error.message,
    });
  }

  const { services, date, time, totalAmount } = req.body;
  appointment.services = services;
  appointment.date = date;
  appointment.time = time;
  appointment.totalAmount = totalAmount;

  try {
    const result = await appointment.save();

    await sendEmailUpdateAppointmentToAdmin({
      date: convertToPPPPDate(result.date),
      time: result.time,
    });

    res.json({
      msg: "La cita se actualizó correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  if (validateObjectId(id, res)) return;

  const appointment = await Appointment.findById(id).populate("services");
  if (!appointment) {
    return handleNotFoundError("La cita no existe", res);
  }

  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tiene los permisos para ver esta cita");

    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    const result = await appointment.deleteOne();

    await sendEmailCancelledAppointmentToAdmin({
      date: convertToPPPPDate(result.date),
      time: result.time,
    });

    res.json({
      msg: "La cita se eliminó correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  createAppointment,
  getAppointmentsByDate,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
