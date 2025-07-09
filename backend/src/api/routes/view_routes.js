// Router de Express para las rutas de vistas
import { Router } from "express";
// Todos los controladores de vistas
import {vistaListado, vistaBuscarId, vistaCrear, vistaActualizar, vistaEliminar} from "../controllers/view_controllers.js"

const router = Router();

// Rutas para las vistas web:

// Listado de productos - GET /dashboard/
router.get("/", vistaListado);

// Buscar producto por ID - GET /dashboard/buscar
router.get("/buscar", vistaBuscarId);

// Crear producto - GET /dashboard/crear
router.get("/crear", vistaCrear);

// Modificar producto - GET /dashboard/actualizar
router.get("/actualizar", vistaActualizar);

// Eliminar producto - GET /dashboard/eliminar
router.get("/eliminar", vistaEliminar);

export default router;