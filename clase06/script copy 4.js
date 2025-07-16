const carrito = [
  { nombre: "Camisa", precio: 50, cantidad: 2 },
  { nombre: "Pantalón", precio: 80, cantidad: 10 },
  { nombre: "Zapatos", precio: 120, cantidad: 5 },
];

/* carrito.forEach( (item, index) => {
    if (item.nombre === "Medias") {
      console.log("Econtrado en el indice " + index);
    }
}) */

const indice = carrito.findIndex( item => item.nombre === "Medias");
console.log(indice);
