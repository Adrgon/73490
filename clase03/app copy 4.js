function saludar(){
    console.log("Hola a todos")
}

saludar()
let nombre = "Dylan"
let n = "Lucas"

function saludarPersona(nombre, apellido="Perez") {
    //nombre = nombre + " Gimenez"
    alert("Hola " + nombre + " " + apellido)
}

//console.log(nombre) // nombre

//saludarPersona("Juan");
//saludarPersona("Marcos")
//saludarPersona(nombre, "Gimenez") // saludo
//saludarPersona(n)


function operaciones(num1, num2){
    console.log("La suma del priero mas el segundo es " + num1 + num2);
    console.log("El doble del primer numero " + num1 * 2);
    console.log("La mitad del segundo numero " + num2 / 2);
    console.log("El primero al cuadrado " + num1 * num1);
    console.log("---------------------")
}

//DRY: don't repeat yourself
operaciones(10, 20);
operaciones(10, 5)


function usarCuchara () {
    console.log("Comer");
    console.log("Hacerse las pestañas");
    console.log("Hacer música");
}

//notaciones para variables o funciones
/* camelCase
snake_case
//kebab-case // no funciona en javascrpt 
PascalCase */

// Para funciones se sugiere utilizar verbos o acciones como nombre
