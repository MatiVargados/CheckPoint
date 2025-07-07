/////////////////////
// Modelo Producto //

import connection from "../database/db.js";

// - Consultas para la base de datos (mysql)

const selectAllProductos = async() => { 
    let sql = `SELECT * FROM productos`;
    //al usar[rows] la destructuracion extrae directamente las filas (que es el primer elemento del resultado de la consulta), nos sirve porque hace el codigo mas legible y explicito
    
    return await connection.query(sql);
};

const selectIdProductos = async(id) => {
    let sql = "SELECT * FROM productos where id = ?";

    return await connection.query(sql, [id]);
};

const selectInsertProductos = async(nombre, imagen, categoria, precio, activo) => {
    // Hacemos uso de placeholders ? para prevenir ataques de SQL Injection
    let sql = `INSERT INTO productos (nombre, imagen, categoria, precio, activo) VALUES (?, ?, ?, ?, ?)`;

    return await connection.query(sql, [nombre, imagen, categoria, precio, activo]);
};

const selectUpdateProductos = async(nombre, imagen, categoria, precio, activo, id) => {
    let sql = `
        UPDATE productos
        SET nombre = ?, imagen = ?, categoria = ?, precio = ?, activo = ?
        WHERE id = ?
        `;

    return await connection.query(sql, [ nombre, imagen, categoria, precio, activo, id]);

};

const selectDeleteProductos = async(id) => {
    let sql = "DELETE FROM productos WHERE id = ?";

    return await connection.query(sql, [id]);
};

export default {
    selectAllProductos,
    selectIdProductos,
    selectInsertProductos,
    selectUpdateProductos,
    selectDeleteProductos
}