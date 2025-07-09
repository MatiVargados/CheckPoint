// URL de la API
const url = `http://localhost:3000/api`;

// El formulario de alta de productos
let altaProducts_form = document.getElementById("altaProducts-form");

// Cuando se envia el formulario
altaProducts_form.addEventListener("submit", async (event) => {

event.preventDefault(); // Sin esto se arruina todo

// Capturamos los datos del formulario
let formData = new FormData(event.target);

// Convertimos FormData a objeto normal
let data = Object.fromEntries(formData.entries());
console.log(data);
console.table(data);

// Chequeamos que esten todos los campos
if (!data.nombre || !data.imagen || !data.precio){
    alert("Todos los campos son obligatorios");
    return;
}

// El precio no puede ser negativo
if (Number(data.precio) < 0) {
    alert("el precio no puede ser negativo");
    return res.status(400).json({
        message: "El precio no puede ser negativo"
    });
}

try {
    // Enviamos el producto nuevo
    let response = await fetch(`${url}/productos`, {
    method: "POST",
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

    } else {
    let error = await response.json();
    console.log("Error:", error.message);
    }

} catch (error) {
    console.error("Error al enviar los datos", error);
    alert("Error al procesar la solicitud")
}

});