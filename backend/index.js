// Traemos las librerias que necesitamos
import express from "express";
// Configuracion del entorno (puerto, etc.)
import environments from "./src/api/config/environment.js";
// CORS para permitir peticiones desde otros dominios
import cors from 'cors';
// Middleware para logging de URLs
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
// Las rutas de productos y vistas
import { productosRoutes, viewRoutes } from "./src/api/routes/index.js";
// Utilidades para manejar rutas de archivos
import { join, __dirname } from "./src/api/utils/index.js"

const PORT = environments.port;
const app = express();

// Configuramos EJS como motor de plantillas para renderizar vistas
app.set("view engine", "ejs");

// Definimos donde estan las plantillas .ejs
// join combina el directorio raiz con src/views
app.set("views", join(__dirname, "src/views"));

// Configuramos express para que sirva los archivos estaticos
// Asi podes acceder a CSS, JS, imagenes y todo eso
app.use(express.static(join(__dirname, "src/public")));

////////////////////
// Middlewares //
// Para parsear JSON en las peticiones
app.use(express.json());
// CORS basico que permite todas las solicitudes
app.use(cors());
// Middleware para registrar las URLs que se visitan
app.use(loggerUrl);

//////////////
////RUTAS/////

// Las rutas de vistas van en /dashboard
app.use("/dashboard", viewRoutes);

// Las rutas de productos van en /api/productos
app.use("/api/productos", productosRoutes);

// Arrancamos el servidor
app.listen(PORT, () => {
    console.log(`link: http://localhost:${PORT}/dashboard`);
})