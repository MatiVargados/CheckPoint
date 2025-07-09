// mysql2 en modo promesa para usar async/await
import mysql from "mysql2/promise";

// Traemos la configuracion de la base de datos
import enviroments from "../config/environment.js";

const { database } = enviroments;

// Creamos un pool de conexiones
// Un pool es mas eficiente que crear una nueva conexion cada vez
const connection = mysql.createPool({
    host: database.host,
    port: database.port,
    database: database.name,
    user: database.user,
    password: database.password
});

// Exportamos la conexion para usarla en otros archivos
export default connection;
