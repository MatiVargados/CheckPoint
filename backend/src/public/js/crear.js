const url = `http://localhost:3000/api`;

let altaProducts_form = document.getElementById("altaProducts-form");

altaProducts_form.addEventListener("submit", async (event) => {

event.preventDefault(); // sin esto se arruina la ainformacion

// Como obtenemos y almacenamos la informacion de un formulario en js?
let formData = new FormData(event.target);

// Transformamos nuestro objeto FormData en un objeto normal JS
let data = Object.fromEntries(formData.entries());
console.log(data);
console.table(data);

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