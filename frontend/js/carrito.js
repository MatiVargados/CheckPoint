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
let arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Obtener el nombre de usuario del localStorage
let nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';

// Actualizar el saludo del usuario
let contenedorNombreUsuario = document.querySelector(".saludo-usuario");
if (contenedorNombreUsuario) {
    contenedorNombreUsuario.innerHTML = `Hola ${nombreUsuario}!`;
}

// Función para mostrar los elementos del carrito
function mostrarElementosCarrito() {
    localStorage.setItem('carrito', JSON.stringify(arrayCarrito));

    let contenedorCarrito = document.getElementById("contenedor-carrito-productos");
    
    if (!contenedorCarrito) {
        console.error('Contenedor del carrito no encontrado');
        return;
    }
    
    let html = ``;
    
    if (arrayCarrito.length === 0) {
        html += '<p style="text-align: center; margin-top: 20px; font-size: 18px;">El carrito está vacío</p>';
    } else {
        html += '<ul>';

        let contadorProductos =  0;

        arrayCarrito.forEach(producto => {
            html += `
                <li class="tarjeta-carrito">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <p>Nombre: ${producto.nombre} | Precio: $ ${producto.precio} |</p>
                    <section>
                        <p>Cantidad:</p>
                        <div>
                            <button onclick="descontarCantidadElementoCarrito('${producto.id}', ${false})"> < </button>
                            <p>${producto.cantidad}</p>
                            <button onclick="agregarCantidadElementoCarrito('${producto.id}')"> > </button>
                        </div>
                    </section>
                    <button onclick="descontarCantidadElementoCarrito('${producto.id}', ${true})" class="botonEliminar-carrito">Eliminar</button>
                </li>  
            `;
            contadorProductos += producto.cantidad;
        });
        
        html += '</ul>';

        localStorage.setItem("cantidadProductosCarrito", contadorProductos.toString());
        
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

// Función para agregar cantidad de un elemento existente
function agregarCantidadElementoCarrito(id) {
    let producto = arrayCarrito.find(producto => producto.id === id || producto._id === id);
    if (producto) {
        producto.cantidad += 1;
        mostrarElementosCarrito();
    }
}

// Función para descontar cantidad o eliminar producto
function descontarCantidadElementoCarrito(id, eliminar) {
    // Encontrar el índice del producto
    let index = arrayCarrito.findIndex(producto => producto.id === id || producto._id === id);
    
    if (index !== -1) {
        // Si la cantidad es mayor a 1, restar
        if (arrayCarrito[index].cantidad > 1 && eliminar === false) {
            arrayCarrito[index].cantidad -= 1;
        } else {
            // Si la cantidad es 1, eliminar el producto
            arrayCarrito.splice(index, 1);
        }
        mostrarElementosCarrito();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        arrayCarrito = [];
        mostrarElementosCarrito();
    }
}

// Función para finalizar la compra
function finalizarCompra() {
    if (arrayCarrito.length === 0) {
        alert('El carrito está vacío');
        localStorage.clear();
        window.location.href = "frontend\\html\\inicio.html";
        return;
    }
    
    let total = arrayCarrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    alert(`¡Compra finalizada! Total: $${total}`);
    
    // Vaciar el carrito después de la compra
    arrayCarrito = []
    mostrarElementosCarrito();
}

// Inicializar la página cuando se carga
document.addEventListener('DOMContentLoaded', function() {
    mostrarElementosCarrito();
});
