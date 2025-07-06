import express from "express";
import environments from "./src/api/config/environment.js";
import cors from 'cors';
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productosRoutes } from "./src/api/routes/index.js";

const PORT = environments.port;
const app = express();

////////////////////
// Middlewares //
app.use(express.json());
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes
app.use(loggerUrl);

// Productos
app.use("/api/productos", productosRoutes);

app.listen(PORT, () => {
    console.log(`link: http://localhost:${PORT}/api/productos`);
})