import nodemailer from "nodemailer";

export function createTransporter(host, port, user, pass) {
  return nodemailer.createTransport({
    host: host, // servidor de correo (gmail, hotmail, etc)
    port: port, // puerto del servidor de correo
    auth: {
      user: user, // correo del emisor
      pass: pass, // contraseña del correo del emisor
    },
  });
}
