import { createTransporter } from "../config/nodemailer.js";

export async function sendEmailVerification({ name, email, token }) {
  // Nos crea el transporter que tendrá los métodos para enviar emails, en este caso usamos Mailtrap
  const transporter = createTransporter(
    "sandbox.smtp.mailtrap.io",
    2525,
    "e59b1a67ee3afb",
    "340abe8b832a27"
  );

  // Enviar el email
  const info = await transporter.sendMail({
    from: "appSalon@correo.com", // Quien envía el email
    to: email, // A quien se le envía el email
    subject: "AppSalon - Confirma tu cuenta", // Asunto del email
    text: "Hola, confirma tu cuenta", // Contenido del email
    html: `
        <p>Hola ${name}, confirma tu cuenta en AppSalon</p>
        <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace:</p>
        <a href="http://localhost:4000/api/auth/verify/${token}">Confirmar cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `, // Contenido del email en HTML
  });

  // info nos devuelve un objeto con la información del email enviado
  console.log("Mensaje enviado: ", info.messageId);
}
