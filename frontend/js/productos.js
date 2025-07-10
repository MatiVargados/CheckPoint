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
let catalogo = localStorage.getItem("catalogo") || "juegos";
let productosData = [];

// Variables contador de productos carritos
let cantidadCargadaProductosCarrito = parseInt(localStorage.getItem("cantidadProductosCarrito")) || 0;
let contenedorContadorProductos = document.getElementById("CantidadProdutos-carrito");
contenedorContadorProductos.innerHTML = `Productos: ${cantidadCargadaProductosCarrito}`;

// Elementos del DOM
let contenedorBotones = document.getElementById("selector-catalogo");
const btnJuegos = document.getElementById("btn-juegos");
const btnConsolas = document.getElementById("btn-consolas");

// Event listeners para los botones
btnJuegos.addEventListener("click", () => elegirCatalogo("juegos"));
btnConsolas.addEventListener("click", () => elegirCatalogo("consolas"));

function elegirCatalogo(catalogoElegido) {
    catalogo = catalogoElegido; // modifica a la variable global asi muestra los productos del catalogo
    let color = "";

    if (temaOscuroClaro === true){
        color = "2px solid black"
    } else {
        color = "2px solid white"
    }
    
    // Actualizar el estilo visual de los botones
    if (catalogoElegido === "juegos") {
        btnJuegos.style.borderBottom = color;
        btnConsolas.style.borderBottom = "2px solid transparent";
        localStorage.setItem("catalogo", "juegos");
    } else {
        btnJuegos.style.borderBottom = "2px solid transparent";
        btnConsolas.style.borderBottom = color;
        localStorage.setItem("catalogo", "consolas");
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
            if (producto.activo === 1){
                htmlProductos += `
                    <li class="tarjeta-producto">
                        <img src="${producto.imagen || '/frontend/elementos/imagenes/productos/juegos/pokemon-rojo-fuego.png'}" 
                            alt="${producto.nombre || 'Producto'}">
                        <h1>${producto.nombre || 'Sin nombre'}</h1>
                        <p>$${producto.precio || '0'}</p>
                        <button class="btn-agregar-carrito" data-id="${producto.id || producto._id || producto.nombre}">Agregar al Carrito</button>
                    </li>
                `;
            }
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

    // Contador de productos // 
    cantidadCargadaProductosCarrito += 1;
    contenedorContadorProductos.innerHTML = `Productos: ${cantidadCargadaProductosCarrito}`;
    localStorage.setItem("cantidadProductosCarrito", cantidadCargadaProductosCarrito.toString());

}

///////////////////////////////////
// CAMBIAR TEMA (CLARO / OSCUTO) //
              //(TRUE / FALSE)
let botonCambiarTema = document.getElementById("boton-cambiarTema");
let linkCSS = document.getElementById("css-tema");

// Función para aplicar el modo
function aplicarModo(tema) {
    if (tema) {
    elegirCatalogo(localStorage.getItem("catalogo"));
    linkCSS.href = "/frontend/css/styleClaro.css";
    botonCambiarTema.innerHTML = `<img src="/frontend/elementos/imagenes/Tema/claro.png" alt="tema claro">`;
    } else {
    elegirCatalogo(localStorage.getItem("catalogo"));
    linkCSS.href = "/frontend/css/styleOscuro.css";
    botonCambiarTema.innerHTML = `<img src="/frontend/elementos/imagenes/Tema/oscuro.png" alt="tema oscuro">`;
    }
}

let temaOscuroClaro = localStorage.getItem("temaOscuroClaro") === "true";
aplicarModo(temaOscuroClaro);

// Al hacer clic, cambiar el modo y guardarlo
botonCambiarTema.addEventListener("click", function() {
    temaOscuroClaro = !temaOscuroClaro; // al tocar el boton (quiere que cambie el tema) invertimos el valor del tema
    aplicarModo(temaOscuroClaro);
    localStorage.setItem("temaOscuroClaro", temaOscuroClaro); 
});

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
    
    // Agregar event listener para el ordenamiento
    const selectOrdenar = document.getElementById('ordenar');
    if (selectOrdenar) {
        selectOrdenar.addEventListener('change', ordenarProductos);
    }
});

// Función para ordenar productos
function ordenarProductos() {
    const orden = document.getElementById('ordenar').value;
    const productos = document.querySelectorAll('#contenedor-productos li');
    const productosArray = Array.from(productos);
    
    productosArray.sort((a, b) => {
        if (orden === 'nombre') {
            const nombreA = a.querySelector('h1').textContent;
            const nombreB = b.querySelector('h1').textContent;
            return nombreA.localeCompare(nombreB);
        }
        if (orden === 'precio') {
            const precioA = parseInt(a.querySelector('p').textContent.replace('$', ''));
            const precioB = parseInt(b.querySelector('p').textContent.replace('$', ''));
            return precioA - precioB;
        }
    });
    
    // Limpiar y reordenar
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';
    productosArray.forEach(producto => contenedor.appendChild(producto));
    
    // Reasignar eventos a los botones después de reordenar
    document.querySelectorAll('.btn-agregar-carrito').forEach(btn => {
        btn.addEventListener('click', function() {
            agregarAlCarrito(this.getAttribute('data-id'));
        });
    });
}

