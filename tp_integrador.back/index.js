import express from "express";
import environments from "./src/api/config/environment.js";
import connection from "./src/api/database/db.js";
import cors from 'cors';
import { clearCache } from "ejs";

const port = environments.port;

const app = express();

////////////////////
// Middlewares //
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes


//RUTAS//
app.get("/", (req, res) => {
    res.send("hola mundo");
});

//CRUD -> create(POST) - Read(GET) - Update(PUT) - Delete(DELETE)
//1. primer endpoint GET -> traer todos los productos
app.get("/productos", async (req, res) => {

    try {
        let sql = `SELECT * FROM productos`;
        //al usar[rows] la destructuracion extrae directamente las filas (que es el primer elemento del resultado de la consulta), nos sirve porque hace el codigo mas legible y explicito
        const [rows] = await connection.query(sql);

        res.status(200).json({
            payload:rows,
            message: rows.length === 0? "No se encontraron productos": "Productos obtenidos correctamente"
        });

    } catch(error){
        console.log("Error obteniendo productos:", error);
        res.status(500).json({
            error: "Error interno del servidor al obtener productos"
        })   
    }
});
app.listen(port, () =>{
    console.log(`Servidor corriendo en el puerto ${port}`);
    console.log(`link: http://localhost:${port}`);
});