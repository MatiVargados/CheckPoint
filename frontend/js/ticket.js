/**
 * ARCHIVO: ticket.js
 * 
 * FUNCIÓN PRINCIPAL: Gestiona la visualización del ticket de compra
 * 
 * ¿QUÉ HACE ESTE ARCHIVO?
 * - Carga los productos del carrito desde localStorage
 * - Muestra el ticket con los productos comprados
 * - Calcula y muestra el total
 * - Permite volver al inicio
 */

// Obtener datos del carrito desde localStorage
let productosCompra = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para mostrar el ticket
function mostrarTicket() {
    const contenedorProductos = document.getElementById('productos-ticket');
    const totalElement = document.getElementById('total-ticket');
    
    let html = '';
    let total = 0;
    
    if (productosCompra.length === 0) {
        html = '<p class="mensaje-sin-productos">No hay productos en la compra</p>';
    } else {
        productosCompra.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;
            
            html += `
                <div class="producto-ticket">
                    <div class="producto-info">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <div>
                            <h4>${producto.nombre}</h4>
                            <p>Cantidad: ${producto.cantidad}</p>
                            <p>Precio: $${producto.precio}</p>
                        </div>
                    </div>
                    <div class="producto-subtotal">
                        <p>Subtotal: $${subtotal}</p>
                    </div>
                </div>
            `;
        });
    }
    
    contenedorProductos.innerHTML = html;
    totalElement.textContent = total;
    
    // Limpiar el carrito después de mostrar el ticket
    localStorage.removeItem('carrito');
}

// Función para volver al inicio
function volverAlInicio() {
    limpiarLocalStorage();
    window.location.href = '/frontend/html/inicio.html';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    mostrarTicket();
    
    // Botón para continuar (volver al inicio)
    document.getElementById('btn-continuar').addEventListener('click', volverAlInicio);
});

// Aplicar tema
let linkCSS = document.getElementById("css-tema");
let temaOscuroClaro = localStorage.getItem("temaOscuroClaro") === "true";

function aplicarModo(tema) {
    if (tema) {
        linkCSS.href = "/frontend/css/styleClaro.css";
    } else {
        linkCSS.href = "/frontend/css/styleOscuro.css";
    }
}

aplicarModo(temaOscuroClaro); 

function limpiarLocalStorage() {
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("carrito");
    localStorage.removeItem("cantidadProductosCarrito");
}
