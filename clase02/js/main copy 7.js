
// dos tipos de ciclos
// conteo
// condicion


// Ciclos for
// Inicializador
// condicion
// incremento

/* for(let i = 0; i < 10; i++){
    console.log(i);
} */

/* for (let i = 0; i < 10; i+=1) {
  console.log("El numero es :" + i);
} */

let tabla = prompt("Que tabla queres ver? (1-10)");
table = Number(tabla);
for(let i= 0; i <=10; i+=1){
    console.log(i + ' x ' + tabla + ' = ' + (i * tabla))
}
