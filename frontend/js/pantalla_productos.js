import { nombreUsuario } from "./index.js";

let contenedorNombreUsuario = document.querySelector(".saludo-usuario");
contenedorNombreUsuario.innerHTML = `Hola ${nombreUsuario}!`

/* por ahora esta funcion es estetica | mas adelante hay que llevarla a un archivo js para que no solamente cambie lo estetico sino
que tambien pueda cambiar los objetos que se muestran*/

let contenedorBotones = document.getElementById("selector-catalogo");

const btnJuegos = document.getElementById("btn-juegos");
const btnConsolas = document.getElementById("btn-consolas");

btnJuegos.addEventListener("click", () => elegirCatalogo("juegos"));
btnConsolas.addEventListener("click", () => elegirCatalogo("consolas"));



let catalogo = "";

function elegirCatalogo(catalogoElegido) {

    let nuevoHtmlOpcionCategoria = "";

    // para cuando hagamos el cambio de objetos entre juegos y consolas podriamos hacer que se meta toda la tablar del sql en la lista que se vaya a mostrar
    switch (catalogoElegido) {
        case "juegos":
            nuevoHtmlOpcionCategoria = `
                <button style="border-bottom: 2px solid black;" onclick="elegirCatalogo('juegos')">Video Juegos</button> 
                <button onclick="elegirCatalogo('consolas')">Consolas</button>
            `;
            break;

        case "consolas":
            nuevoHtmlOpcionCategoria = `
                <button onclick="elegirCatalogo('juegos')">Video Juegos</button> 
                <button style="border-bottom: 2px solid black;" onclick="elegirCatalogo('consolas')">Consolas</button>
            `;
            break;
    }

    contenedorBotones.innerHTML = nuevoHtml;

    catalogo = catalogoElegido;
}

const url = `http://localhost:3000/api`;

fetch(`${url}/productos`) // Realizamos un HTTP del get a la url
    .then(respuesta => respuesta.json()) // Convertimos la respuesta en un objeto js
    .then(data => {
    console.log(data);
    mostrarProductos(data);
    })
    .catch(error => console.error("ERROR", error));
    

function mostrarProductos(array){

    let listaProductos = array.payload; // el paiload es para llamar a un conjunto de datos
    console.table(listaProductos);

    let contenedor_productos = document.getElementById("contenedor-productos");
    let htmlProductos = "";

    listaProductos.forEach(producto => {
    htmlProductos += `
    <li class="tarjeta-producto">
            <img src="/frontend/elementos/imagenes/productos/juegos/pokemon-rojo-fuego.png" alt="juego">
            <h1>Rojo Fuego</h1>
            <p>$200</p>
            <button>Agregar al Carrito</button>
        </li>
    `;
    });

    contenedor_productos.innerHTML = htmlProductos;
}

