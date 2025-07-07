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

    let productos_lista = document.getElementById("productos-lista");
    let htmlProductos = "";

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