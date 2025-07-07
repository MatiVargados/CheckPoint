const url = `http://localhost:3000/api`;
      
let getId_lista = document.getElementById("getId-lista");
let getProduct_form = document.getElementById("getProduct-form");
let updateForm_container = document.getElementById("updateForm-container");

getProduct_form.addEventListener("submit", async(event) =>{

event.preventDefault();

try {
// Optimización 1: Mostramos un estado de carga
getId_lista.innerHTML = "<p class='loading'>Cargando producto...</p>";

// Como obtenemos y almacenamos la informacion de un formulario en js?
let formData = new FormData(event.target);
console.log(formData);

// Obtener informacion de un formulario html y la vamos a convetir en informacion js
let data = Object.fromEntries(formData.entries());
console.log(data); // en teoria idProd (pero no me aparece en el panel f12)

// Se almacena el valor numerico 
let idProd = data.idProd.trim(); // Optimizacion 2: sacamos posibles espacios 
console.log(idProd);

// Optimizacion 3: Validacion basica
//(si no existe o no es un numero)
if (!idProd || isNaN(idProd)) {
    throw new Error("Porfavor ingrese un id de producto valido");
}

let response = await fetch(`${url}/productos/${idProd}`);

// Optimizacion 4: Manejamos el error en una posible respuesta no exitosa
if (!response.ok) {
    throw new Error("Porfavor ingrese un id de producto valido");
}

let datos = await response.json(); // transforma los datos en js
console.log(datos);

// Optimizacion 5: Verificamos si hay productos en la respuesta
if (!datos.payload || datos.payload.length === 0){
    throw new Error("No se encontro el producto solicitado")
}

let producto = datos.payload[0]; // es el primer objeto del array


mostrarProducto(producto);

} catch (error) {
console.error("Error al obtener producto: ", error);
getId_lista.innerHTML = `<p>${error.message}</p>`
}
})

function mostrarProducto(producto){
console.log(producto.imagen);

let htmlProducto =  `
                <div class="li-listados productos-listados">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="img-listados">
                    <p>Id: ${producto.id} / Nombre: ${producto.nombre}/ <strong>Precio: $  ${producto.precio}</strong></p>
                    <input class="listados-boton" id="deleteProduct-button" type="button" value="Eliminar producto">
                </div>  
                `;

getId_lista.innerHTML = htmlProducto; 

let deleteProduct_button = document.getElementById("deleteProduct-button");

let idProd = producto.id;

deleteProduct_button.addEventListener("click", function(event){
event.stopPropagation();

let confirmacion = confirm("Queres eliminar el producto?");

if (!confirmacion) {
    alert("Eliminacion cancelada");
} else {
    eliminarProducto(idProd);
}
});
}

async function eliminarProducto(id){
try {
let response = await fetch(`${url}/productos/${id}`, {
    method: "DELETE"
});

let resultado = await response.json();

if (response.ok) {
    alert(resultado.message);
    getId_lista.innerHTML = ""; 
} else {
    console.error("Error", resultado.message);
    alert("No se puedo eliminar producto.");
}
} catch (error) {
console.error("Error en la solicitud DELETE", error);
alert("Ocurrio un error al eliminar el producto");
}
}