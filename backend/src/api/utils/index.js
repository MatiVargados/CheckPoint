/////////////////////////////////////////////////////////////////
// Utilidades para trabajar con archivos y rutas en Express.js //
// Compatible con ES modules

// Modulos para trabajar con rutas
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Convertimos la URL del archivo actual a ruta local
const __filename = fileURLToPath(import.meta.url);

// Retrocedemos 3 niveles para llegar a la raiz del proyecto
// /utils -> /api -> /src -> tpIntegradorBack/
const __dirname = join(dirname(__filename), "../../../");

// Exportamos para usar en otros archivos
export {
    __dirname,
    join
}