/**
 * ARCHIVO: pantalla_productos.js
 * 
 * FUNCIÓN PRINCIPAL: Página de productos - Muestra catálogo y permite agregar al carrito
 * 
 * ¿QUÉ HACE ESTE ARCHIVO?
 * - Carga productos desde la API del servidor
 * - Muestra productos por categorías (juegos/consolas)
 * - Permite buscar productos por nombre
 * - Permite agregar productos al carrito
 * - Guarda productos en el navegador para uso offline
 * - Muestra el saludo personalizado al usuario

 */

// Obtener el nombre de usuario del localStorage o usar un valor por defecto
let nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';

let contenedorNombreUsuario = document.querySelector(".saludo-usuario");
contenedorNombreUsuario.innerHTML = `Hola ${nombreUsuario}!`;

// Variables globales
let catalogo = "juegos";
let productosData = [];

// Elementos del DOM
let contenedorBotones = document.getElementById("selector-catalogo");
const btnJuegos = document.getElementById("btn-juegos");
const btnConsolas = document.getElementById("btn-consolas");

// Event listeners para los botones
btnJuegos.addEventListener("click", () => elegirCatalogo("juegos"));
btnConsolas.addEventListener("click", () => elegirCatalogo("consolas"));

function elegirCatalogo(catalogoElegido) {
    catalogo = catalogoElegido;
    
    // Actualizar el estilo visual de los botones
    if (catalogoElegido === "juegos") {
        btnJuegos.style.borderBottom = "2px solid black";
        btnConsolas.style.borderBottom = "2px solid transparent";
    } else {
        btnJuegos.style.borderBottom = "2px solid transparent";
        btnConsolas.style.borderBottom = "2px solid black";
    }
    
    // Filtrar y mostrar productos según la categoría
    mostrarProductosFiltrados();
}

// Función para cargar productos desde la API
async function cargarProductos() {
    const url = `http://localhost:3000/api`;
    
    try {
        const respuesta = await fetch(`${url}/productos`);
        if (!respuesta.ok) {
            throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        const data = await respuesta.json();
        console.log("Datos recibidos:", data);
        
        // Guardar los datos globalmente
        productosData = data.payload || [];
        
        // Mostrar productos iniciales
        mostrarProductosFiltrados();
        
    } catch (error) {
        console.error("Error al cargar productos:", error);
        mostrarProductosError();
    }
}

// BARRA DE BUSQUEDA
let barraBusqueda = document.querySelector(".barra-busqueda");

barraBusqueda.addEventListener("keyup", function(){
    let valorInput = barraBusqueda.value.toLowerCase();
    
    // Filtrar productos según la búsqueda y la categoría actual
    let productosFiltrados = productosData.filter(producto => {
        const coincideBusqueda = producto.nombre.toLowerCase().includes(valorInput);
        const coincideCategoria = !producto.categoria || producto.categoria.toLowerCase() === catalogo;
        return coincideBusqueda && coincideCategoria;
    });
    
    // Mostrar productos filtrados
    mostrarProductosFiltrados(productosFiltrados);
});

function mostrarProductosFiltrados(productosAMostrar = null) {
    let contenedor_productos = document.getElementById("contenedor-productos");
    let htmlProductos = "";

    let productosParaMostrar = productosAMostrar || productosData.filter(producto => {
        return !producto.categoria || producto.categoria.toLowerCase() === catalogo;
    });

    if (productosParaMostrar.length === 0) {
        htmlProductos = '<li class="mensaje-error">No hay productos disponibles</li>';
    } else {
        productosParaMostrar.forEach(producto => {
            htmlProductos += `
                <li class="tarjeta-producto">
                    <img src="${producto.imagen || '/frontend/elementos/imagenes/productos/juegos/pokemon-rojo-fuego.png'}" 
                         alt="${producto.nombre || 'Producto'}">
                    <h1>${producto.nombre || 'Sin nombre'}</h1>
                    <p>$${producto.precio || '0'}</p>
                    <button class="btn-agregar-carrito" data-id="${producto.id || producto._id || producto.nombre}">Agregar al Carrito</button>
                </li>
            `;
        });
    }

    contenedor_productos.innerHTML = htmlProductos;

    // Asignar el evento a los botones
    document.querySelectorAll('.btn-agregar-carrito').forEach(btn => {
        btn.addEventListener('click', function() {
            agregarAlCarrito(this.getAttribute('data-id'));
        });
    });
}

function mostrarProductosError() {
    let contenedor_productos = document.getElementById("contenedor-productos");
    contenedor_productos.innerHTML = `
        <li class="mensaje-error">
            Error al cargar los productos. Por favor, intenta de nuevo más tarde.
        </li>
    `;
}

// Función para agregar al carrito (actualizada para ser compatible)
function agregarAlCarrito(productoId) {
    if (!productosData || productosData.length === 0) {
        alert("Los productos aún no se cargaron. Espera un momento e intenta de nuevo.");
        return;
    }
    console.log("ID recibido:", productoId);
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    console.log("Carrito antes:", carrito);

    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
        productoExistente.cantidad += 1;
        console.log("Producto ya en carrito, nueva cantidad:", productoExistente.cantidad);
    } else {
        // ¡Agregá este log!
        console.log("productosData:", productosData);
        productosData.forEach(p => console.log("Producto:", p));
        const producto = productosData.find(p => p.id == productoId || p._id == productoId || p.nombre == productoId);
        console.log("Producto encontrado:", producto);
        if (producto) {
            carrito.push({
                id: productoId,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: 1
            });
            console.log("Producto agregado al carrito");
        } else {
            console.log("No se encontró el producto para agregar");
        }
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log("Carrito después:", carrito);
    alert('Producto agregado al carrito!');
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
});

