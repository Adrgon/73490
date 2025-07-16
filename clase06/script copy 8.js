const carrito = [
  { nombre: "Zapatos", precio: 300, cantidad: 1 },
  { nombre: "Camisa", precio: 50, cantidad: 2 },
  { nombre: "Pantalón", precio: 80, cantidad: 10 },
  { nombre: "Zapatos", precio: 20, cantidad: 5 },
];

const resultado = carrito.every( item => item.precio < 100)
console.log(resultado);
