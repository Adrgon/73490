const numeros = [1, 2, 3, 4, 5];


const carrito = [
  { nombre: "Zapatos", precio: 300, cantidad: 1 },
  { nombre: "Camisa", precio: 50, cantidad: 2 },
  { nombre: "Pantalón", precio: 80, cantidad: 10 },
  { nombre: "Zapatos", precio: 20, cantidad: 5 },
];

/* let x2 = numeros.map( num => num * 2)
console.log(numeros)
console.log(x2); */

/* 
const carritoConImpuesto = carrito.map( item => { return {
    nombre: item.nombre,
    precio: item.precio * 1.21,
    cantidad: item.cantidad
}}) 
*/

/* const carritoConImpuesto = carrito.map((item) => ({
    nombre: item.nombre,
    precio: item.precio * 1.21,
    cantidad: item.cantidad,
})); */

const carritoConImpuesto = carrito.map((item) => `
<h1>${item.nombre}</h1>
<p>Precio: ${item.precio * 1.21}</p>
`)

//console.log(carrito)
console.log(carritoConImpuesto)
