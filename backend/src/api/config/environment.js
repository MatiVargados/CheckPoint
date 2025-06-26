import dotenv from "dotenv";

dotenv.config(); //carga las variables de entorno desde el archivo .env

export default{
    port: process.env.port || 3000,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }

}

//para probar si conectaba a la db
console.log('DB_USER:', process.env.DB_USER);