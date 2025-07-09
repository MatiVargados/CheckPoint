/**
 * ARCHIVO: carrito.js
 * 
 * FUNCIÓN PRINCIPAL: Gestiona el carrito de compras del usuario
 * 
 * ¿QUÉ HACE ESTE ARCHIVO?
 * - Permite agregar productos al carrito
 * - Muestra los productos en el carrito
 * - Permite aumentar/disminuir cantidades
 * - Permite eliminar productos
 * - Calcula el total de la compra
 * - Guarda el carrito en el navegador (localStorage)
 * - Permite vaciar el carrito o finalizar la compra
 */

// Variable global para el carrito
let arrayCarrito = [];

// Obtener el nombre de usuario del localStorage
let nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';

// Actualizar el saludo del usuario
let contenedorNombreUsuario = document.querySelector(".saludo-usuario");
if (contenedorNombreUsuario) {
    contenedorNombreUsuario.innerHTML = `Hola ${nombreUsuario}!`;
}

// Función para agregar elementos al carrito
function agregarElementosCarrito(id) {
    // Obtener productos del localStorage (que se guardan desde pantalla_productos.js)
    let productosTienda = JSON.parse(localStorage.getItem('productosTienda') || '[]');
    
    // Si no hay productos en localStorage, usar los datos de la API
    if (productosTienda.length === 0) {
        // Intentar obtener desde la API
        cargarProductosDesdeAPI().then(() => {
            productosTienda = JSON.parse(localStorage.getItem('productosTienda') || '[]');
            procesarAgregarProducto(id, productosTienda);
        });
    } else {
        procesarAgregarProducto(id, productosTienda);
    }
}

// Función auxiliar para procesar la adición del producto
function procesarAgregarProducto(id, productosTienda) {
    // Buscar el producto en la tienda
    let nuevoProducto = productosTienda.find(producto => producto.id === id || producto._id === id);
    
    if (!nuevoProducto) {
        console.error('Producto no encontrado:', id);
        return;
    }
    
    // Verificar si el producto ya está en el carrito
    let productoAgregado = arrayCarrito.find(producto => producto.id === id || producto._id === id);

    if (productoAgregado) {
        // Si ya existe, aumentar la cantidad
        agregarCantidadElementoCarrito(id);
    } else {
        // Si es nuevo, agregarlo al carrito
        let productoParaCarrito = {
            id: nuevoProducto.id || nuevoProducto._id,
            nombre: nuevoProducto.nombre,
            precio: nuevoProducto.precio,
            imagen: nuevoProducto.imagen,
            cantidad: 1
        };
        arrayCarrito.push(productoParaCarrito);
    }

    // Guardar en localStorage y mostrar
    guardarCarritoEnLocalStorage();
    mostrarElementosCarrito();
}

// Función para agregar cantidad de un elemento existente
function agregarCantidadElementoCarrito(id) {
    let producto = arrayCarrito.find(producto => producto.id === id || producto._id === id);
    if (producto) {
        producto.cantidad += 1;
        guardarCarritoEnLocalStorage();
        mostrarElementosCarrito();
    }
}

// Función para descontar cantidad o eliminar producto
function descontarCantidadElementoCarrito(id) {
    // Encontrar el índice del producto
    let index = arrayCarrito.findIndex(producto => producto.id === id || producto._id === id);
    
    if (index !== -1) {
        // Si la cantidad es mayor a 1, restar
        if (arrayCarrito[index].cantidad > 1) {
            arrayCarrito[index].cantidad -= 1;
        } else {
            // Si la cantidad es 1, eliminar el producto
            arrayCarrito.splice(index, 1);
        }
        
        guardarCarritoEnLocalStorage();
        mostrarElementosCarrito();
    }
}

// Función para eliminar completamente un producto del carrito
function eliminarProductoCarrito(id) {
    let index = arrayCarrito.findIndex(producto => producto.id === id || producto._id === id);
    
    if (index !== -1) {
        arrayCarrito.splice(index, 1);
        guardarCarritoEnLocalStorage();
        mostrarElementosCarrito();
    }
}

// Función para mostrar los elementos del carrito
function mostrarElementosCarrito() {
    let contenedorCarrito = document.getElementById("contenedor-carrito-productos");
    
    if (!contenedorCarrito) {
        console.error('Contenedor del carrito no encontrado');
        return;
    }
    
    let html = `
        <div class="tarjeta-carrito" style="margin-top: 20px;">
            <h1>IMAGEN</h1>
            <h1>NOMBRE</h1>
            <h1>PRECIO</h1>
            <h1>CANTIDAD</h1>
            <h1>ACCIONES</h1>
        </div>
    `;
    
    if (arrayCarrito.length === 0) {
        html += '<p style="text-align: center; margin-top: 20px; font-size: 18px;">El carrito está vacío</p>';
    } else {
        html += '<ul>';
        
        arrayCarrito.forEach(producto => {
            html += `
                <li class="tarjeta-carrito">
                    <img src="${producto.imagen || '/frontend/elementos/imagenes/productos/juegos/pokemon-rojo-fuego.png'}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio}</p>
                    <div>
                        <button onclick="descontarCantidadElementoCarrito('${producto.id}')"> - </button>
                        <p>${producto.cantidad}</p>
                        <button onclick="agregarCantidadElementoCarrito('${producto.id}')"> + </button>
                    </div>
                    <button onclick="eliminarProductoCarrito('${producto.id}')" style="background-color: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Eliminar</button>
                </li>
            `;
        });
        
        html += '</ul>';
        
        // Agregar total del carrito
        let total = arrayCarrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
        html += `
            <div style="text-align: center; margin-top: 20px; font-size: 20px; font-weight: bold;">
                <p>Total del carrito: $${total}</p>
                <button onclick="vaciarCarrito()" style="background-color: #ff4444; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin: 10px;">Vaciar Carrito</button>
                <button onclick="finalizarCompra()" style="background-color: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin: 10px;">Finalizar Compra</button>
            </div>
        `;
    }
    
    contenedorCarrito.innerHTML = html;
}

// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(arrayCarrito));
}

// Función para cargar el carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    let carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        arrayCarrito = JSON.parse(carritoGuardado);
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        arrayCarrito = [];
        guardarCarritoEnLocalStorage();
        mostrarElementosCarrito();
    }
}

// Función para finalizar la compra
function finalizarCompra() {
    if (arrayCarrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    let total = arrayCarrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    alert(`¡Compra finalizada! Total: $${total}`);
    
    // Vaciar el carrito después de la compra
    arrayCarrito = [];
    guardarCarritoEnLocalStorage();
    mostrarElementosCarrito();
}

// Inicializar la página cuando se carga
document.addEventListener('DOMContentLoaded', function() {
    cargarCarritoDesdeLocalStorage();
    mostrarElementosCarrito();
});
