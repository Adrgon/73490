const carrito = [
  { nombre: "Zapatos", precio: 300, cantidad: 1 },
  { nombre: "Camisa", precio: 50, cantidad: 2 },
  { nombre: "Pantalón", precio: 80, cantidad: 10 },
  { nombre: "Zapatos", precio: 120, cantidad: 5 },
];

const resultado = carrito.find((item) => item.nombre === "Zapatos");
console.log(resultado);

const res = carrito.find((item) => item.nombre === "Botines");
console.log(res);
