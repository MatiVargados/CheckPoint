
const url = `http://localhost:3000/api`;

let getId_lista = document.getElementById("getId-lista");
let getProduct_form = document.getElementById("getProduct-form");

getProduct_form.addEventListener("submit", async(event) =>{

try {
    event.preventDefault(); // evitamos el envio por defecto del formulario

    // Como obtenemos y almacenamos la informacion de un formulario en js?
    let formData = new FormData(event.target);
    console.log(formData);
    
    // Obtener informacion de un formulario html y la vamos a convetir en informacion js
    let data = Object.fromEntries(formData.entries());
    console.log(data); // en teoria idProd (pero no me aparece en el panel f12)

    // Se almacena el valor numerico 
    let idProd = data.idProd;
    console.log(idProd);

    let response = await fetch(`${url}/productos/${idProd}`);
    let datos = await response.json(); // transforma los datos en js
    console.log(datos);

    let producto = datos.payload[0]; // es el primer objeto del array

    console.log(producto.imagen);

    let htmlProducto =  `
                    <li class="li-listados productos-listados">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-listados">
                        <p>Id: ${producto.id} / Nombre: ${producto.nombre}/ <strong>Precio: $  ${producto.precio}</strong></p>
                    </li>
                    `;

    getId_lista.innerHTML = htmlProducto;

} catch (error) {
    console.error("Error al obtener producto: ", error);
}
})

