// Traemos el modelo de productos
import Productos from "../models/productos_models.js"

// Vista principal con listado de productos
const vistaListado = async (req, res) =>{

    try {
        const respuestaProductos = await Productos.selectAllProductos();

        res.render("index", {
            title: "Listado de Productos",
            productos: respuestaProductos[0]
        });  

    } catch (error) {
        console.error(`Error al listar productos`, error.message);
        res.status(500).json({
        error: "Error interno al obtener la lista de productos"
        });      
    }

};

// Vista de busqueda por ID
const vistaBuscarId = async (req, res) =>{
    res.render("buscar", {
        title: "Buscar Producto ID",
    }); 
};

// Vista de creacion de productos
const vistaCrear = async (req,res) =>{
    res.render("crear", {
        title:"Crear Producto"
    });
};

// Vista de actualizacion de productos
const vistaActualizar = async (req, res) =>{
    res.render("actualizar", {
        title: "Actualizar Productos"
    });
};

// Vista de eliminacion de productos
const vistaEliminar = async (req, res) =>{
    res.render("eliminar", {
        title: "Eliminar Productos"
    });
};

// Exportamos todos los controladores de vistas
export {
    vistaListado,
    vistaBuscarId,
    vistaCrear,
    vistaActualizar,
    vistaEliminar
}