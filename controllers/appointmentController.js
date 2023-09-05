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
import Appointment from "../models/Appointment.js";

const createAppointment = async (req, res) => {
  const appointment = req.body;
  appointment.user = req.user._id.toString();

  try {
    const newAppointment = new Appointment(appointment);
    const result = await newAppointment.save();

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
  const { date } = req.query;
  const newDate = parse(date, "dd/MM/yyyy", new Date());

  if (!isValid(newDate)) {
    const error = new Error("La fecha no valida");

    return res.status(401).json({
      msg: error.message,
    });
  }

  const isoDate = formatISO(newDate);

  try {
    const appointments = await Appointment.find({
      date: {
        $gte: startOfDay(new Date(isoDate)),
        $lte: endOfDay(new Date(isoDate)),
      },
    }).select("time");

    res.json(appointments);
  } catch (error) {
    console.log(error);
  }
};

const getAppointmentById = async (req, res) => {
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
