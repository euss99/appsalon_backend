import { createTransporter } from "../config/nodemailer.js";

export async function sendEmailNewAppointmentToAdmin({ date, time }) {
  // Este transporter prepara el objeto que enviará el email
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  const info = await transporter.sendMail({
    from: "AppSalon <citas@correo.com>", // Quien envía el email
    to: "admin@appsalon.com", // A quien se le envía el email
    subject: "AppSalon - Nueva cita", // Asunto del email
    text: "AppSalon - Nueva cita", // Contenido del email en texto plano
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">¡Hola Admin,</h2>
        <p style="font-size: 16px;">Tienes una nueva cita!</p>
        <p style="font-size: 16px;">La cita será el día ${date}, a las ${time} horas.</p>
      </div>
      `, // Contenido del email en HTML con estilos y una imagen
  });

  console.log("Mensaje enviado: ", info.messageId);
}

export async function sendEmailUpdateAppointmentToAdmin({ date, time }) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  const info = await transporter.sendMail({
    from: "AppSalon <citas@correo.com>",
    to: "admin@appsalon.com",
    subject: "AppSalon - Cita actualizada",
    text: "AppSalon - Cita actualizada",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">¡Hola Admin, un asuario ha modificado una cita.</h2>
        <p style="font-size: 16px;">La nueva cita será el día ${date}, a las ${time} horas.</p>
      </div>
      `, // Contenido del email en HTML con estilos y una imagen
  });

  console.log("Mensaje enviado: ", info.messageId);
}

export async function sendEmailCancelledAppointmentToAdmin({ date, time }) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  const info = await transporter.sendMail({
    from: "AppSalon <citas@correo.com>",
    to: "admin@appsalon.com",
    subject: "AppSalon - Cita cancelada",
    text: "AppSalon - Cita cancelada",
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333;">¡Hola Admin, un asuario ha cancelado una cita.</h2>
          <p style="font-size: 16px;">La nueva cita estabá programadá para el día ${date}, a las ${time} horas.</p>
        </div>
        `, // Contenido del email en HTML con estilos y una imagen
  });

  console.log("Mensaje enviado: ", info.messageId);
}
