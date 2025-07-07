// Importamos express.Router
import { Router } from "express";
import {vistaListado, vistaBuscarId, vistaCrear, vistaActualizar, vistaEliminar} from "../controllers/view_controllers.js"

const router = Router();

// Ruta de vista listado productos
router.get("/", vistaListado);

// Ruta de vista consultar producto por id
router.get("/buscar", vistaBuscarId);

// Ruta de vista crear producto
router.get("/crear", vistaCrear);

// Ruta de vista modificar producto
router.get("/actualizar", vistaActualizar);

// Ruta de vista eliminar producto
router.get("/eliminar", vistaEliminar);

// Exportamos las rutas de las vistas
export default router;