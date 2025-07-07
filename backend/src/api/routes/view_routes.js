// Importamos express.Router
import { Router } from "express";

const router = Router();

// Ruta de vista listado productos
router.get("/", (req, res) =>{
    res.render("index", {
        title: "Listado de Productos"
    });
});

// Ruta de vista consultar producto por id
router.get("/buscar", (req, res) =>{
    res.render("buscar", {
        title: "buscar productos por id"
    });
});

// Ruta de vista crear producto
router.get("/crear", (req,res) =>{
    res.render("crear", {
        title:"Crear Producto"
    });
});

// Ruta de vista modificar producto
router.get("/actualizar", (req, res) =>{
    res.render("actualizar", {
        title: "Actualizar Productos"
    });
});

// Ruta de vista eliminar producto
router.get("/delete", (req, res) =>{
    res.render("delete", {
        title: "Eliminar Productos"
    });
});

// Exportamos las rutas de las vistas
export default router;