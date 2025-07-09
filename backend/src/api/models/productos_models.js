/////////////////////
// Modelo Producto //
// Todas las consultas SQL para la tabla productos

import connection from "../database/db.js";

// - Consultas para MySQL

// Traer todos los productos
const selectAllProductos = async() => { 
    let sql = `SELECT * FROM productos`;
    // [rows] extrae directamente las filas del resultado
    return await connection.query(sql);
};

// Traer un producto por ID
const selectIdProductos = async(id) => {
    let sql = "SELECT * FROM productos where id = ?";
    return await connection.query(sql, [id]);
};

// Crear un nuevo producto
const selectInsertProductos = async(nombre, imagen, categoria, precio, activo) => {
    // Usamos ? para prevenir SQL Injection
    let sql = `INSERT INTO productos (nombre, imagen, categoria, precio, activo) VALUES (?, ?, ?, ?, ?)`;
    return await connection.query(sql, [nombre, imagen, categoria, precio, activo]);
};

// Actualizar un producto
const selectUpdateProductos = async(nombre, imagen, categoria, precio, activo, id) => {
    let sql = `
        UPDATE productos
        SET nombre = ?, imagen = ?, categoria = ?, precio = ?, activo = ?
        WHERE id = ?
        `;
    return await connection.query(sql, [ nombre, imagen, categoria, precio, activo, id]);
};

// Eliminar un producto
const selectDeleteProductos = async(id) => {
    let sql = "DELETE FROM productos WHERE id = ?";
    return await connection.query(sql, [id]);
};

// Exportamos todas las funciones
export default {
    selectAllProductos,
    selectIdProductos,
    selectInsertProductos,
    selectUpdateProductos,
    selectDeleteProductos
}