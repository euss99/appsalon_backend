import { createTransporter } from "../config/nodemailer.js";

export async function sendEmailVerification({ name, email, token }) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  const info = await transporter.sendMail({
    from: "AppSalon <appSalon@correo.com>",
    to: email,
    subject: "Confirma tu cuenta en AppSalon",
    text: "Hola,",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">¡Hola ${name},</h2>
        <p style="font-size: 16px;">Estamos emocionados de darte la bienvenida a AppSalon!</p>
        <p style="font-size: 16px;">Tu cuenta está casi lista. Solo debes confirmarla haciendo clic en el siguiente enlace:</p>
        <p style="font-size: 16px;"><a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}" style="color: #007bff; text-decoration: underline;">Confirmar cuenta</a></p>
        <p style="font-size: 16px;">Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
        <p style="font-size: 16px;">¡Gracias por unirte a nuestra comunidad!</p>
        <p style="font-size: 16px;">Saludos,</p>
        <p style="font-size: 16px;">El equipo de AppSalon</p>
      </div>
      `,
  });

  console.log("Mensaje enviado: ", info.messageId);
}

export async function sendEmailPasswordReset({ name, email, token }) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );

  const info = await transporter.sendMail({
    from: "AppSalon <appSalon@correo.com>",
    to: email,
    subject: "AppSalon - Restablecer contraseña",
    text: "AppSalon - Restablecer contraseña,",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333;">¡Hola ${name},</h2>
        <p style="font-size: 16px;">Has solicitado reestablecer tu password!</p>
        <p style="font-size: 16px;">Sigue el siguiente enlace para generar un nuevo password:</p>
        <p style="font-size: 16px;"><a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}" style="color: #007bff; text-decoration: underline;">Reestablecer password</a></p>
        <p style="font-size: 16px;">Si tu no solicitaste esto, puedes ignorar este mensaje.</p>
        <p style="font-size: 16px;">Saludos,</p>
        <p style="font-size: 16px;">El equipo de AppSalon</p>
      </div>
      `,
  });

  console.log("Mensaje enviado: ", info.messageId);
}
