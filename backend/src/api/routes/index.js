// ARCHIVO DE BARRIL - centraliza todas las rutas
// Punto de entrada para todas las rutas de la app

// Rutas de productos (API REST)
import productosRoutes from "./productos_routes.js"
// Rutas de vistas (paginas web)
import viewRoutes from "./view_routes.js"

// Exportamos todo para usarlo en index.js
export {
    productosRoutes,
    viewRoutes
}