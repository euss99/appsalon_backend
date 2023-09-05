import mongoose from "mongoose";
import colors from "colors";

export const db = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI); // Conectando a la base de datos
    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(colors.cyan(`MongoDB se concetó correctamente: ${url}`));
  } catch (error) {
    console.log(colors.red(`Error: ${error}`));
    process.exit(1);
  }
};
