import express from "express";
import environments from "./src/api/config/environment.js";
import cors from 'cors';
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productosRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js"

const PORT = environments.port;
const app = express();

// Configuramos EHS como motor de planillas
app.set("view engine", "ejs");

// Definimos la ruta donde estan almacenadas las plantillas .ejs con join combinamos el directorio raiz del proyecto con src/views
app.set("views", join(__dirname, "src/views"));

// Configuramos express para que sirva archivos estaticos desde la carpeta public
app.use(express.static(join(__dirname, "src/public")));

////////////////////
// Middlewares //
app.use(express.json());
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes
app.use(loggerUrl);

///////////
// Rutas //

// Vistas
app.get("/dashboard", (req, res) =>{
    res.render("index", {
        title: "Listado de Productos"
    });
});

// Productos
app.use("/api/productos", productosRoutes);

app.listen(PORT, () => {
    console.log(`link: http://localhost:${PORT}`);
})