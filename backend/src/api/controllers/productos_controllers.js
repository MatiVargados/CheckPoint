// Traemos el modelo de productos
import Productos from "../models/productos_models.js";

// Traer todos los productos - GET /api/productos
const getAllProductos = async (req, res) => {

    try {
        const [rows] = await Productos.selectAllProductos();

        res.status(200).json({
            payload: rows,
            message: rows.length === 0? "No se encontraron productos": "Productos obtenidos correctamente"
        });

    } catch(error){
        console.log("Error obteniendo productos:", error);
        res.status(500).json({
            error: "Error interno del servidor al obtener productos"
        })   
    }
};

// Traer un producto por ID - GET /api/productos/:id
const getIdProductos = async (req, res) => {
  try {
    let { id } = req.params;

    let [rows] = await Productos.selectIdProductos(id);

    // Si no encontramos el producto
    if (rows.length === 0) {
      return res.status(404).json({
        error: `No se encontro el producto con id: ${id}`
      });
    }

    res.status(200).json({
      payload: rows
    });
  } catch (error) {
    console.error(`Error obteniendo producto con id ${id}`, error.message);
    res.status(500).json({
      error: "Error interno al obtener un producto por id"
    });
  }
};

// Crear un nuevo producto - POST /api/productos
const createProductos = async (req, res) => {
    try {
        let { categoria, imagen, nombre, precio, activo } = req.body;

        // Chequeamos que esten todos los campos
        if(!categoria || !imagen || !nombre || !precio || !activo) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar nombre, imagen, categoria, precio y activo"
            });
        }

        let [rows] = await Productos.selectInsertProductos(nombre, imagen, categoria, precio, activo);

        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
};

// Actualizar un producto - PUT /api/productos
const updateProductos = async (req, res) => {
    try {
        let { id, categoria, imagen, nombre, precio, activo } = req.body;

        // Chequeamos que esten todos los campos
        if(!id || !categoria|| !imagen || !nombre || !precio || !activo) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        let [result] = await Productos.selectUpdateProductos(nombre, imagen, categoria, precio, activo, id);

        // Si no se actualizo nada
        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se actualizo el producto"
            })
        }

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.error("Error al actualizar el producto", error);
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
};

// Eliminar un producto - DELETE /api/productos/:id
const deleteProductos = async (req, res) => {
    try {
        let { id } = req.params;

        if(!id) {
            return res.status(400).json({
                message: "Se requiere un id para eliminar un productos"
            })
        }

        let [result] = await Productos.selectDeleteProductos(id);

        // Si no se elimino nada
        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: `No se encontro un productos con id ${id}`
            });
        }

        return res.status(200).json({
            message: `Productos con id ${id} eliminado correctamente`
        });

    } catch (error) {
        console.error("Error en DELETE /productos/:id", error);
        res.status(500).json({
            message: `Error al eliminar productos con id ${id}`, error,
            error: error.message
        })
    }
};

// Exportamos todos los controladores
export {
  getAllProductos,
  getIdProductos,
  createProductos,
  updateProductos,
  deleteProductos
};