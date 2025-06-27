// se importa en modulo myql2 en modo promesa para un async/awat en la conexion a la BBDD MySql
import mysql from "mysql2/promise";

//traemos los datos de conexion de nuestro archivo de variables de entorno
import enviroments from "../config/environment.js";

const { database } = enviroments;

const connection = mysql.createPool({
    host: database.host,
    port: database.port, 
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;
