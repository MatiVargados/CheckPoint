// URL de la API
const url = `http://localhost:3000/api`;
        
// Pedimos todos los productos
fetch(`${url}/productos`)
    .then(respuesta => respuesta.json())
    .then(data => {
    console.log(data);
    mostrarProductos(data);
    })
    .catch(error => console.error("ERROR", error));
    

// Mostramos los productos en la pagina
function mostrarProductos(array){

    let listaProductos = array.payload;
    console.table(listaProductos);

    let productos_lista = document.getElementById("productos-lista");
    let htmlProductos = "";

    // Creamos el HTML para cada producto
    listaProductos.forEach(producto => {
    htmlProductos += `
    <li class="li-listados productos-listados">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-listados">
        <p>Id: ${producto.id} / Nombre: ${producto.nombre}/ <strong>Precio: $  ${producto.precio}</strong></p>
    </li>
    `;
    });

    productos_lista.innerHTML = htmlProductos;
}