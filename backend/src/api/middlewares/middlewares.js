// Logger para registrar las peticiones HTTP
// Se ejecuta en cada peticion y muestra fecha, metodo y URL
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
};

// Validacion de ID - se aplica a rutas especificas
// Chequea que el ID sea un numero valido antes de procesar
const validateId = (req, res, next) => {
    const id = req.params.id;

    // Nos fijamos que el ID exista y sea un numero
    if (!id || isNaN(id)) {
        return res.status(400).json({
            error: "El ID debe ser un numero"
        });
    }

    // Convertimos el ID de string a numero y lo guardamos en req.id
    req.id = parseInt(id, 10)
    next();
};

// Exportamos los middlewares
export {
    loggerUrl,
    validateId
}