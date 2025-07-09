// Router de Express para crear las rutas
import {Router} from "express";
// Middleware de validacion de ID
import { validateId } from "../middlewares/middlewares.js";
// Todos los controladores de productos
import { createProductos, deleteProductos, getAllProductos, getIdProductos, updateProductos } from "../controllers/productos_controllers.js";

const router = Router();

// Rutas de la API REST para productos:

// 1. GET /api/productos - traer todos los productos
router.get("/", getAllProductos);

// 2. GET /api/productos/:id - traer producto por ID
// Usa validateId para chequear que el ID sea un numero
router.get("/:id", validateId, getIdProductos);

// 3. POST /api/productos - crear nuevos productos
router.post("/", createProductos);

// 4. PUT /api/productos - actualizar productos
router.put("/", updateProductos);

// 5. DELETE /api/productos/:id - eliminar un producto
// Usa validateId para chequear que el ID sea un numero
router.delete("/:id", validateId, deleteProductos);

export default router;