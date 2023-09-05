# AppSalon Backend

El backend de AppSalon es una parte fundamental de la aplicación que gestiona todas las operaciones relacionadas con servicios de belleza y citas. Proporciona una API RESTful segura que se utiliza para crear, obtener, actualizar y eliminar servicios y citas. Además, incorpora funcionalidades de autenticación con JSON Web Token (JWT), confirmación de correo electrónico y notificaciones por correo electrónico.

## Tecnologías Utilizadas

El backend de AppSalon se construyó utilizando una variedad de tecnologías y bibliotecas:

- **Node.js**: La aplicación backend se desarrolló en Node.js, proporcionando un entorno de ejecución eficiente para JavaScript en el servidor.

- **Express.js**: Express es un framework web para Node.js que simplifica la creación de aplicaciones web y API.

- **MongoDB**: La base de datos de MongoDB se utilizó para almacenar información sobre servicios, citas y usuarios.

- **Mongoose**: Mongoose es una biblioteca de modelado de objetos MongoDB para Node.js, que proporciona una interfaz de base de datos más sólida.

- **bcrypt**: bcrypt se usó para el hashing seguro de contraseñas de usuarios y verificar contraseñas durante el proceso de inicio de sesión.

- **CORS**: Se implementó CORS (Cross-Origin Resource Sharing) para permitir solicitudes HTTP desde el frontend de la aplicación.

- **JWT (JSON Web Token)**: JWT se utilizó para la autenticación de usuarios y la generación de tokens de acceso seguros.

- **nodemailer**: Nodemailer se usó para enviar correos electrónicos de confirmación y notificaciones al administrador cuando se crean o modifican citas.

- **dotenv**: Dotenv se utilizó para cargar variables de entorno desde un archivo .env para mantener la configuración segura.

- **date-fns**: date-fns se empleó para operaciones de manejo de fechas en la lógica de la aplicación.

## Funcionalidades Principales

El backend de AppSalon proporciona las siguientes funcionalidades clave:

- **Servicios de Belleza**: Permite la creación, obtención, actualización y eliminación de servicios de belleza. Además, maneja la obtención de todos los servicios o por su ID.

- **Citas**: Ofrece la creación, obtención, actualización y eliminación de citas. Puede obtener todas las citas, citas por fechas o por su ID. También notifica al administrador por correo electrónico cuando se crea, actualiza o elimina una cita.

- **Autenticación de Usuarios**: La aplicación cuenta con autenticación de usuarios mediante JSON Web Token (JWT). Los usuarios deben confirmar sus cuentas a través de un correo electrónico de confirmación.

- **Seguridad de Contraseñas**: Las contraseñas de los usuarios se almacenan de forma segura con hashing bcrypt.

- **Gestión de Roles**: La aplicación distingue entre usuarios normales y administradores. Los usuarios solo pueden ver sus propias citas, mientras que los administradores pueden ver todas las citas pendientes.

## Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:

```
MONGO_URI=<La URL de conexión a la base de datos de MongoDB>
FRONTEND_URL=<La URL del frontend de la aplicación>
EMAIL_HOST=<El host del servidor SMTP>
EMAIL_PORT=<El puerto del servidor SMTP>
EMAIL_USER=<El usuario del servidor SMTP>
EMAIL_PASS=<La contraseña del servidor SMTP>
JWT_SECRET_KEY=<La clave secreta para JWT>
```

## Uso

Para utilizar el backend de AppSalon, sigue estos pasos:

1. Clona este repositorio: `git clone https://github.com/tu-usuario/appsalon_backend.git`
2. Navega a la carpeta del proyecto: `cd appsalon_backend`
3. Instala las dependencias: `npm install`
4. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno mencionadas anteriormente.

5. Inicia el servidor en modo de desarrollo: `npm run dev`
6. Si deseas probar las rutas y controladores en Postman, usa: `npm run dev:postman`
