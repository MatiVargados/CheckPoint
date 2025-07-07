import Productos from "../models/productos_models.js"

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

const vistaBuscarId = async (req, res) =>{
    res.render("buscar", {
        title: "Buscar Producto ID",

    }); 
};

const vistaCrear = async (req,res) =>{
    res.render("crear", {
        title:"Crear Producto"
    });
};

const vistaActualizar = async (req, res) =>{
    res.render("actualizar", {
        title: "Actualizar Productos"
    });
};

const vistaEliminar = async (req, res) =>{
    res.render("eliminar", {
        title: "Eliminar Productos"
    });
};

export {
    vistaListado,
    vistaBuscarId,
    vistaCrear,
    vistaActualizar,
    vistaEliminar
}