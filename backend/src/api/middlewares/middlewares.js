// Middleware Logger para analizar y registrar las solicitudes
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
};

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
};

export {
    loggerUrl,
    validateId
}