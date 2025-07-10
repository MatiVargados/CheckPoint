// URL de la API
const url = `http://localhost:3000/api`;

// Elementos del DOM
let getId_lista = document.getElementById("getId-lista");
let getProduct_form = document.getElementById("getProduct-form");

// Cuando se envia el formulario de busqueda
getProduct_form.addEventListener("submit", async(event) =>{

try {
    event.preventDefault();

    // Capturamos los datos del formulario
    let formData = new FormData(event.target);
    console.log(formData);
    
    let data = Object.fromEntries(formData.entries());
    console.log(data);

    let idProd = data.idProd;
    console.log(idProd);

    // Pedimos el producto por ID
    let response = await fetch(`${url}/productos/${idProd}`);
    let datos = await response.json();
    console.log(datos);

    let producto = datos.payload[0];

    console.log(producto.imagen);

    // Mostramos el producto encontrado
    let htmlProducto =  `
                    <li class="li-listados productos-listados">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-listados">
                        <p>Id: ${producto.id} / Activo: ${producto.activo === 1} / Nombre: ${producto.nombre}/ <strong>Precio: $ ${producto.precio}</strong></p>
                    </li>
                    `;

    getId_lista.innerHTML = htmlProducto;

} catch (error) {
    console.error("Error al obtener producto: ", error);
}
})