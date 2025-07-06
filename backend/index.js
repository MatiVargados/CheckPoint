import express from "express";
import environments from "./src/api/config/environment.js";
import connection from "./src/api/database/db.js";
import cors from 'cors';
import { clearCache } from "ejs";

const PORT = environments.port;

const app = express();

////////////////////
// Middlewares //
app.use(express.json());
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes

// Middleware Logger para analizar y registrar las solicitudes
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});
//_________________________________________________________________________________________________________________________
// Middleware de ruta -> Aplicados a rutas especificas y ejecutadas solo cuando una solicitud coincide con la ruta definida

const validateId = (req, res, next) => {
    const id = req.params.id; 

    if (!id || isNaN(id)) {
        return res.status(400).json({
            error: "El ID debe ser un numero"
        });
    }

    // Convertimos el parametro id (originalmente un string porque viene de la url) en un entero decimal 
    req.id = parseInt(id, 10)

    next();
}

//CRUD -> create(POST) - Read(GET) - Update(PUT) - Delete(DELETE)
//1. primer endpoint GET -> traer todos los productos
app.get("/productos", async (req, res) => {

    try {
        let sql = `SELECT * FROM productos`;
        //al usar[rows] la destructuracion extrae directamente las filas (que es el primer elemento del resultado de la consulta), nos sirve porque hace el codigo mas legible y explicito
        const [rows] = await connection.query(sql);

        res.status(200).json({
            payload:rows,
            message: rows.length === 0? "No se encontraron productos": "Productos obtenidos correctamente"
        });

    } catch(error){
        console.log("Error obteniendo productos:", error);
        res.status(500).json({
            error: "Error interno del servidor al obtener productos"
        })   
    }
});

// 2. Segundo endpoint GET by id -> Traer producto por su id
// TODO, hacer middleware validateId
app.get("/productos/:id",validateId, async (req, res) => {
  try {
    // let id = req.params.id
    let { id } = req.params;

    // Consulta no optima, porque permite la inyeccion SQL
    let sql = "SELECT * FROM productos where id = ?";

    let [rows] = await connection.query(sql, [id]);

    // Verificamos si se encontro el producto
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
});


// 3. Tercer endpoint POST -> Crear nuevos productos
app.post("/productos", async (req, res) => {
    try {
        let { categoria, imagen, nombre, precio, activo } = req.body;

        if(!categoria || !imagen || !nombre || !precio || !activo) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar nombre, imagen, categoria, precio y activo"
            });
        }

        // Hacemos uso de placeholders ? para prevenir ataques de SQL Injection
        let sql = `INSERT INTO productos (nombre, imagen, categoria, precio, activo) VALUES (?, ?, ?, ?, ?)`;

        let [rows] = await connection.query(sql, [nombre, imagen, categoria, precio, activo]);

        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        }); // Con productId devolvemos info util del insert para deolver el ID del producto creado


    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
});

// 4. Cuarto endpoint -> Update 
app.put("/productos", async (req, res) => {
    try {
        let { id, categoria, imagen, nombre, precio, activo } = req.body;

        if(!id || !categoria|| !imagen || !nombre || !precio || !activo) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        let sql = `
            UPDATE productos
            SET nombre = ?, imagen = ?, categoria = ?, precio = ?, activo = ?
            WHERE id = ?
        `;

        let [result] = await connection.query(sql, [ nombre, imagen, categoria, precio, activo, id]);

        // Testearmos que se actualizara
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
})

// 5. Cuarto endpoint -> Delete 
app.delete("/productos/:id",validateId, async (req, res) => {
    try {
        let { id } = req.params;

        if(!id) {
            return res.status(400).json({
                message: "Se requiere un id para eliminar un productos"
            })
        }

        let sql = "DELETE FROM productos WHERE id = ?";

        let [result] = await connection.query(sql, [id]);

        // Testearmos que se eliminara
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
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})