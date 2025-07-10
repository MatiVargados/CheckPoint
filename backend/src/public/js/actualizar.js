// URL de la API
const url = `http://localhost:3000/api`;

// Elementos del DOM
let getId_lista = document.getElementById("getId-lista");
let getProduct_form = document.getElementById("getProduct-form");
let updateForm_container = document.getElementById("updateForm-container");

// Buscar el producto a actualizar
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

// Mostrar el producto y el boton de actualizar
function mostrarProducto(producto){
console.log(producto.imagen);

let htmlProducto =  `
                    <div class="li-listados productos-listados">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="img-listados">
                    <p>Id: ${producto.id} / Activo: ${producto.activo === 1} / Nombre: ${producto.nombre}/ <strong>Precio: $ ${producto.precio}</strong></p>
                    <input class="listados-boton" id="updateProduct-button" type="button" value="Actualizar producto">
                    </div>  
                    `;

getId_lista.innerHTML = htmlProducto; 

let updateProduct_button = document.getElementById("updateProduct-button");

updateProduct_button.addEventListener("click", function(event){
    formularioPutProducto(event, producto);
});
}

// Crear el formulario de actualizacion
function formularioPutProducto(event, producto){
event.stopPropagation();
console.table(producto);

let updateProduct = `
                    <div id="altaProducts-container" class="crudForm-container">
                        <h2>Caracteristicas</h2>
                        <form id="altaProducts-form" autocomplete="off">
                        
                        <label for="idProd">Id</label>
                        <input type="number" name="id" id="idProd" value="${producto.id}" readonly>

                        <label for="nombreProd">Nombre</label>
                        <input type="text" name="nombre" id="nombreProd" value="${producto.nombre}" required>

                        <label for="imagenProd">Imagen</label>
                        <input type="text" name="imagen" id="imagenProd" value="${producto.imagen}" required>

                        <label for="categoryProd">Categoria</label>
                        <select name="categoria" id="categoryProd" required>
                            <option style="color:black;" value="juegos">Juegos</option>
                            <option style="color:black;" value="consolas">Consolas</option>
                        </select>

                        <label for="precioProd">Precio</label>
                        <input type="number" name="precio" id="precioProd" value="${producto.precio}"required>

                        <label for="activoProd">Activo</label>
                        <select name="activo" id="activoProd" required>
                            <option style="color:black;" value="1">Si</option>
                            <option style="color:black;" value="0">No</option>
                        </select>

                        <input type="submit" value="Actualizar Producto">
                        </form>
                    </div>
                    `;

updateForm_container.innerHTML = updateProduct;

let updateProduct_form = document.getElementById("altaProducts-form")

updateProduct_form.addEventListener("submit", function (event) {
    actualizarProducto(event);
});
}

// Enviar la actualizacion
async function actualizarProducto(evento) {
evento.preventDefault();

let formData = new FormData(event.target);
let data = Object.fromEntries(formData.entries());

// Validaciones
if (!data.nombre || !data.imagen || !data.precio){
    alert("Todos los campos son obligatorios");
    return;
}

if (Number(data.precio) < 0) {
    alert("el precio no puede ser negativo");
    return res.status(400).json({
        message: "El precio no puede ser negativo"
    });
}

try {
    // Enviamos la actualizacion
    let response = await fetch(`${url}/productos`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    });
    
    if (response.ok) {
    console.log(response);

    let resultado = await response.json();
    console.log(resultado.menssage);
    alert(resultado.menssage);

    // Limpiamos todo
    getId_lista.innerHTML = "";
    updateForm_container.innerHTML = "";

    } else {
    let error = await response.json();
    console.log("Error:", error.message);
    }

} catch (error) {
    console.error("Error al enviar los datos", error);
    alert("Error al procesar la solicitud")
}
}