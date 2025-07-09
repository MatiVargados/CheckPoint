// URL de la API
const url = `http://localhost:3000/api`;
      
// Elementos del DOM
let getId_lista = document.getElementById("getId-lista");
let getProduct_form = document.getElementById("getProduct-form");
let updateForm_container = document.getElementById("updateForm-container");

// Buscar el producto a eliminar
getProduct_form.addEventListener("submit", async(event) =>{

event.preventDefault();

try {
getId_lista.innerHTML = "<p class='loading'>Cargando producto...</p>";

let formData = new FormData(event.target);
console.log(formData);

let data = Object.fromEntries(formData.entries());
console.log(data);

let idProd = data.idProd.trim();
console.log(idProd);

// Validacion basica
if (!idProd || isNaN(idProd)) {
    throw new Error("Porfavor ingrese un id de producto valido");
}

let response = await fetch(`${url}/productos/${idProd}`);

if (!response.ok) {
    throw new Error("Porfavor ingrese un id de producto valido");
}

let datos = await response.json();
console.log(datos);

if (!datos.payload || datos.payload.length === 0){
    throw new Error("No se encontro el producto solicitado")
}

let producto = datos.payload[0];

mostrarProducto(producto);

} catch (error) {
console.error("Error al obtener producto: ", error);
getId_lista.innerHTML = `<p>${error.message}</p>`
}
})

// Mostrar el producto y el boton de eliminar
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

// Preguntar confirmacion antes de eliminar
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

// Eliminar el producto
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