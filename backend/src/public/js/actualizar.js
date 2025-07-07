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
                    <input class="listados-boton" id="updateProduct-button" type="button" value="Actualizar producto">
                    </div>  
                    `;

getId_lista.innerHTML = htmlProducto; 

let updateProduct_button = document.getElementById("updateProduct-button");

updateProduct_button.addEventListener("click", function(event){
    formularioPutProducto(event, producto);
});
}

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

                        <label for="categoryProd">Categoría</label>
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
async function actualizarProducto(evento) {
evento.preventDefault();  // Evitamos el envio por defecto del formulario

let formData = new FormData(event.target);
let data = Object.fromEntries(formData.entries());

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

    // Validaciones si existiera la lista y el formulario de actualizacion de producto
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