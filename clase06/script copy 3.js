const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];

const carrito = [
  { nombre: "Camisa", precio: 50, cantidad: 2 },
  { nombre: "Pantalón", precio: 80, cantidad: 10 },
  { nombre: "Zapatos", precio: 120, cantidad: 5 },
];

/* function existe(mes){
    if(mes === "Diciembre"){
        console.log("El mes de diciembre existe")
    }
} */

/* for(let i=0; i<meses.length; i++){
    existe(meses[i])
} */

//meses.forEach(existe);

/* meses.forEach(function(mes) {
  if (mes === "Enero") {
    console.log("El mes de enero existe");
  }
}); */

/* meses.forEach((mes)=> {
  if (mes === "Febrero") {
    console.log("El mes de febrero existe");
  }
}); */

/* const existe = meses.includes("Diciembre")
console.log(existe) */

/* const existe = meses.some(function(mes){
    mes === "Enero"
})
console.log(existe) */

/* const existe = meses.some((mes)=> {
  return mes === "Enero";
});
console.log(existe); */

/* const existe = meses.some( mes => mes === "Junio");
console.log(existe);  */

const existeCarrito = carrito.some( producto => producto.cantidad >= 10)
console.log(existeCarrito)
