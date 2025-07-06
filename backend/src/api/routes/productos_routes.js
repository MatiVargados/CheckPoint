import {Router} from "express";
import { validateId } from "../middlewares/middlewares.js";
import { createProductos, deleteProductos, getAllProductos, getIdProductos, updateProductos } from "../controllers/productos_controllers.js";

const router = Router();

// 1. GET -> traer todos los productos
router.get("/", getAllProductos);

// 2. GET ID -> Traer producto por su id
router.get("/:id",validateId, getIdProductos);

// 3. POST -> Crear nuevos productos
router.post("/", createProductos);

// 4. PUT -> Update Products
router.put("/", updateProductos);

// 5. DELETE -> Eliminar un producto
router.delete("/:id",validateId, deleteProductos);

export default router; // Exportamos las rutas