


function logueoUsuario(usuario, password){
    if (usuario == "admin" && password == "1234") {
      alert("Usuario logueado correctamente");
      empezarComprar();
    } else {
      alert("Usuario o contraseña incorrectos");
    }
}

function iniciarApp(){
    alert("Bienvenido")
    let usr =    prompt("Ingrese su usuario");
    let pass =   prompt("Ingrese su contraseña");
    logueoUsuario(usr, pass);
    return "final de compra"
}

let resultado = iniciarApp()
console.log(resultado);


function empezarComprar() {
  let producto = prompt("Ingrese el nombre del producto que desea comprar");
  let cantidad = prompt("Ingrese la cantidad que desea comprar");
  alert("Ha comprado " + cantidad + " unidades de " + producto);
}
