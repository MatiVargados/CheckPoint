let input_nombreUsuario = document.getElementById("nombre-usuario");
let nombreUsuario = "";

input_nombreUsuario.addEventListener("keyup", function () {
  nombreUsuario = input_nombreUsuario.value;
});

function getNombreUsuario() {
  return nombreUsuario;
}

export {
  getNombreUsuario
}
