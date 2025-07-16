const carrito = [
  { nombre: "Camisa", precio: 50, cantidad: 2 },
  { nombre: "Pantalón", precio: 80, cantidad: 10 },
  { nombre: "Zapatos", precio: 120, cantidad: 5 },
];

let total = 0
carrito.forEach( item => total += item.precio * item.cantidad)
console.log(total)

const resultado = carrito.reduce((total, item)=> total + (item.precio * item.cantidad),1)
console.log(resultado)
