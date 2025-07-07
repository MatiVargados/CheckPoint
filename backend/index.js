import express from "express";
import environments from "./src/api/config/environment.js";
import cors from 'cors';
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productosRoutes, viewRoutes } from "./src/api/routes/index.js";
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

//////////////
////RUTAS/////

app.use("/dashboard", viewRoutes); // rutas vistas

app.use("/api/productos", productosRoutes); // rutas productos

app.listen(PORT, () => {
    console.log(`link: http://localhost:${PORT}`);
})