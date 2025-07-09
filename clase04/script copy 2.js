const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
//console.log(dias)
//console.table(dias)
//let dia = prompt("Ingrese un dia de la semana")
for(let i = 0; i < 7; i+=1){
    if(dias[i] === "Sabado" || dias[i] === "Domingo"){
        console.error(dias[i] + " Es fin de semana")
    }else {
        console.warn(dias[i] + " Dia labroral");
    }
} 

const meses = ["Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"]
console.log(meses)
/* for(let i=1; i< meses.length; i+=1){
    console.log(meses[i])
} */

/* 
let fecha = new Date()
console.log(fecha)
console.log(fecha.getDay());
console.log("Estamos en el mes " + fecha.getMonth()) 
*/

meses[meses.length - 1] = "Septiembre"
console.log(meses)

meses[meses.length - 1] = "Octubre";
console.log(meses);

meses.push("Diciembre")
console.log(meses)
/* meses.pop()
console.log(meses);
meses.unshift("Enero")
console.log(meses)
meses.shift()
console.log(meses);
meses.shift();
console.log(meses);
meses.shift();
console.log(meses);
meses.shift();
console.log(meses);
meses.shift();
console.log(meses); 
*/





/* dias.push("Osvaldo")
console.log(dias) */


/* let numeros = [50, 20]
console.log(numeros)
console.log(numeros.length)
console.log(numeros[0])
console.log(numeros[1]);
console.log(numeros[numeros.length - 1]) 
console.log(numeros[2+2-1+1-2-2]) */


console.log(meses)
meses.splice(2, 2)
console.log(meses)

let frutas = ["Manzana", "Banana", "Cereza", "Damasco", "Fresa"];
console.log(frutas)
const bolsa = frutas.slice(1, 4)
console.log(frutas)
console.log(bolsa)
console.log(frutas.slice(2))
