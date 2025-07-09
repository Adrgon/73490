/* console.log()
alert()
prompt() */

//alert()

//array 
let arr = []
console.log(arr)

let num1 = 1
let num2 = 2
let num3 = 3
let num4 = 4
let num5 = 5

let numeros = [1, 2, 3, 4, 5]
console.log(numeros)

// las variables son son estructuras de datos

let alumno1 = "Rodrigo"
let alumno2 = "Bruno"
let alumnos = new Array("Rodrigo", "Bruno", "Adrian", "Gonzalo", "Javier")
console.log(alumnos)

const detodo = ["hola", 1, true, "no", null, undefined, {}]

let a = 1
let b = [] // referencia
// b en algun lugar de javascript es una direccion de memoria 
// 0x35f2a571ab
//const c = []

console.log(detodo)
console.log(detodo[0])
console.log(detodo[5]);
console.log(detodo[6]);
console.log(detodo[7]);
detodo[7] = "nuevo valor"
console.log(detodo[7]);
detodo[0] = "Primer valor"
console.log(detodo[0]);

console.log(detodo)

const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

for(let i = 0; i < 7; i+=1){
    console.log(dias[i])
}


// objetos
