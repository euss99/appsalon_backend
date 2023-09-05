import Appointment from "../models/Appointment.js";

const getUserAppointments = async (req, res) => {
  const { userId } = req.params;

  if (req.user._id.toString() !== userId) {
    const error = new Error("No tienes permiso para ver estas citas");

    return res.status(401).json({ message: error.message });
  }

  try {
    const query = req.user.admin
      ? {
          date: { $gte: new Date() },
        }
      : {
          user: userId,
          date: { $gte: new Date() },
        };
    const appointments = await Appointment.find(query)
      .populate("services")
      .populate({ path: "user", select: "name email" })
      .sort({ date: "asc" });

    res.json(appointments);
  } catch (error) {
    console.log(error);
  }
};

export { getUserAppointments };
