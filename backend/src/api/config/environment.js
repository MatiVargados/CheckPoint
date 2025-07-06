import dotenv from "dotenv";

dotenv.config(); //carga las variables de entorno desde el archivo .env

export default{
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,  // se usa el db_port cuando tenes un port distinto al predeterminado (en este caso en el xampp)
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}

//para probar si conectaba a la db
console.log('DB_USER:', process.env.DB_USER);