/* declaracion de funciones
ejecucion de funciones 
funciones con paramentros
funciones que retornan valores
encadenamiento de funciones

scope de funciones 
funciones flecha */

/* let nombre = prompt("Cual es tu nombre")
console.log(nombre)
 */
// alert no retorna datos
/* let retorno = alert("Hola")
console.log(retorno) // undefined */
// la funciones que no retornan datos se ve asi

/* function saludar(){
    console.log("Hola a todos")
}
saludar()


function sumar(n1, n2){
    return n1 + n2
}
let resultado = sumar(10, 20)
console.log(resultado) */

/* 
 */

let nombreAlumno = prompt("Ingrese su nombre")
let notaAlumno = parseInt(prompt("Ingrese su nota"))

function devolverNota(alumno, nota){
    return "El alumno " + alumno + " tiene una nota de " + nota;
}

let devolucion = devolverNota(nombreAlumno, notaAlumno);
alert(devolucion)
