import dotenv from "dotenv";
import colors from "colors";
import { db } from "../config/db.js";
import Services from "../models/Services.js";
import { services } from "./beautyServices.js";

dotenv.config();
await db();

async function seedDB() {
  try {
    // insertMany es un método de mongoose que permite insertar varios documentos a la vez en una colección.
    // services es un array de objetos que contiene los datos de los servicios.
    await Services.insertMany(services);
    console.log(colors.green.bold("Se agregaron los datos correctamente"));
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function clearDB() {
  try {
    // deleteMany es un método de mongoose que permite eliminar varios documentos a la vez en una colección.
    await Services.deleteMany();
    console.log(colors.red.bold("Se eliminaron los datos correctamente"));
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

if (process.argv[2] === "--import") {
  seedDB();
} else {
  clearDB();
}
