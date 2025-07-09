// dotenv para manejar variables de entorno
import dotenv from "dotenv";

// Carga las variables desde el archivo .env
dotenv.config();

// Configuracion del entorno
export default{
    // Puerto del servidor, usa el de .env o 3000 por defecto
    port: process.env.PORT || 3000,
    // Configuracion de la base de datos
    database: {
        host: process.env.DB_HOST,        // Host de la base de datos
        port: process.env.DB_PORT,        // Puerto (util cuando usas un puerto diferente, como en XAMPP)
        name: process.env.DB_NAME,        // Nombre de la base de datos
        user: process.env.DB_USER,        // Usuario
        password: process.env.DB_PASSWORD // Contrasena
    }
}

// Para probar si conectaba a la base de datos
console.log('DB_USER:', process.env.DB_USER);