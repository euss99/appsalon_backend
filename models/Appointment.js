import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  services: [
    {
      type: mongoose.Schema.Types.ObjectId, // Almacena el id del objeto
      ref: "Services", // Nombre del modelo con el que quieres que se relacione el ObjectId
      /*
        Esto lo que hace, es que si el usuario almacena dos servicios, vamos a tener los ObjectId de los dos servicios,
        y utilizando moongose podemos decirle que esos dos ObjectId se relacionan con el modelo Service, y así podemos
        obtener los datos de los servicios que el usuario ha almacenado.
      */
    },
  ], // Arreglo de objetos
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  // Tambien tenemos que almacenar el usuario que creo la cita
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    /*
      Esto trae el ObjectId del usuario que creo la cita, y con eso podemos obtener los datos del usuario, gracias a la
      relación que tenemos con el modelo User.
    */
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
