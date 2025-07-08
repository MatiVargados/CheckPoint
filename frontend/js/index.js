let input_nombreUsuario = document.getElementById("nombre-usuario");
let nombreUsuario = "";

// Cargar nombre guardado si existe
if (localStorage.getItem('nombreUsuario')) {
    input_nombreUsuario.value = localStorage.getItem('nombreUsuario');
    nombreUsuario = localStorage.getItem('nombreUsuario');
}

input_nombreUsuario.addEventListener("keyup", function () {
    nombreUsuario = input_nombreUsuario.value;
});

// Guardar nombre cuando se hace clic en "Aceptar"
document.querySelector(".boton-inicio").addEventListener("click", function(e) {
    e.preventDefault();
    
    if (nombreUsuario.trim() === "") {
        alert("Por favor, ingresa tu nombre");
        return;
    }
    
    // Guardar en localStorage
    localStorage.setItem('nombreUsuario', nombreUsuario);
    
    // Redirigir a productos
    window.location.href = "/frontend/html/productos.html";
});

// También permitir Enter para enviar
input_nombreUsuario.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        document.querySelector(".boton-inicio").click();
    }
});
