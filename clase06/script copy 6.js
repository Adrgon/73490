let carrito = [
  { nombre: "Camisa", precio: 50, cantidad: 2 },
  { nombre: "Pantalón", precio: 80, cantidad: 10 },
  { nombre: "Zapatos", precio: 120, cantidad: 5 },
];
console.log(carrito);
//const resultado1 = carrito.filter((item) => item.precio > 70);
//const resultado2 = carrito.filter((item) => item.nombre === "Camisa");
const futuroCarrito = carrito.filter((item) => item.nombre !== "Camisa");
//console.log(resultado1);
//console.log(resultado2)
console.log(futuroCarrito);
