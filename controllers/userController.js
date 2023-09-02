import Appointment from "../models/Appointment.js";

const getUserAppointments = async (req, res) => {
  const { userId } = req.params; // Obteniendo el userId de los parámetros de la ruta

  // Verificando que el usuario qqe hace la petición sea el mismo que el usuario de los parámetros de la ruta
  const role = "user"; // El rol del usuario que hace la petición
  if (req.user._id.toString() !== userId && role !== "admin") {
    // Si el userId del usuario que hace la petición es diferente al userId de los parámetros de la ruta y el rol del usuario que hace la petición no es admin
    const error = new Error("No tienes permiso para ver estas citas");

    return res.status(401).json({ message: error.message });
  }

  try {
    const appointments = await Appointment.find({
      user: userId,
      date: { $gte: new Date() }, // Buscando las citas que tengan una fecha mayor o igual a la fecha actual
    })
      .populate("services")
      .sort({ date: "asc" }); // Buscando las citas que tengan el userId que recibimos en los parámetros de la ruta
    // .populate("services") es para que nos muestre los datos de los servicios que están relacionados con la cita con el ObjectId que se encuentra en el campo services de la cita
    // .sort({ date: "asc" }) es para ordenar las citas por fecha de forma ascendente (de la más cerca a pasar a la más lejana)

    res.json(appointments); // Enviando las citas
  } catch (error) {
    console.log(error);
  }
};

export { getUserAppointments };
