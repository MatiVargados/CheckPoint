import express from "express";
import environments from "./src/api/config/environment.js";
import connection from "./src/api/database/db.js";
import { clearCache } from "ejs";

const port = environments.port;

const app = express();

////////////////////
// Middlewares //
//app.use(cors()); // Middleware CORS basico que permite todas las solicitudes


//RUTAS//
app.get("/", (req, res) => {
    res.send("hola mundo");
});

//CRUD -> create(POST) - Read(GET) - Update(PUT) - Delete(DELETE)
//1. primer endpoint GET -> traer todos los productos
app.get("/products", async (req, res) => {

    try {
        let sql = `SELECT * from products`;
        //al usar[rows] la destructuracion extrae directamente las filas (que es el primer elemento del resultado de la consulta), nos sirve porque hace el codigo mas legible y explicito
        const [rows] = await connection.query(sql);

        //console.log(resultado[0])
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron usuarios" : "Usuarios no encontrados"
        });

    } catch(error){
        console.log("Error obteniendo procustos, error");
        res.status(500).json({
            error: "Error interno del servidos al obtener productos"
        })   
    }
})
app.listen(port, () =>{
    console.log(`Servidor corriendo en el puerto ${port}`);
    console.log(`link: http://localhost:${port}`);
});