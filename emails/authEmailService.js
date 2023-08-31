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
    from: "AppSalon <appSalon@correo.com>", // Quien envía el email
    to: email, // A quien se le envía el email
    subject: "Confirma tu cuenta en AppSalon", // Asunto del email
    text: "Hola,", // Contenido del email en texto plano
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">¡Hola ${name},</h2>
        <p style="font-size: 16px;">Estamos emocionados de darte la bienvenida a AppSalon!</p>
        <p style="font-size: 16px;">Tu cuenta está casi lista. Solo debes confirmarla haciendo clic en el siguiente enlace:</p>
        <p style="font-size: 16px;"><a href="http://localhost:4000/api/auth/verify/${token}" style="color: #007bff; text-decoration: underline;">Confirmar cuenta</a></p>
        <p style="font-size: 16px;">Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
        <p style="font-size: 16px;">¡Gracias por unirte a nuestra comunidad!</p>
        <p style="font-size: 16px;">Saludos,</p>
        <p style="font-size: 16px;">El equipo de AppSalon</p>
      </div>
      `, // Contenido del email en HTML con estilos y una imagen
  });

  // info nos devuelve un objeto con la información del email enviado
  console.log("Mensaje enviado: ", info.messageId);
}
