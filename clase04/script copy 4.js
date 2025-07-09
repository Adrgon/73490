// Producto
const nombreProducto = "Camiseta";
const precioProducto = 20000;
const disponibilidadProducto = true;



// Terricolo
const nombre = "Adrian";

console.log (nombreProducto);
console.log (precioProducto);
console.log (disponibilidadProducto);

const obj = {} // Se lo conoce como objeto literal
console.log(obj)


/* let presentar = function () {
  console.log("Este es el mejor objeto de la tienda");
}; */

/* 
const producto = {
    nombre: // Esto es una propiedad
} 
*/
/*
const producto = {
     nombre: "Camiseta"
}  */

//const colores = ["Rojo", "Verde", "Azul"];  


const producto = {
    nombre: "Camiseta",
    precio: 20000,
    disponibilidad: true,
    talle: {s: "Small", m: "Medium", l: "Large"},
    
    //metodo de un objeto
    mostrar : function () {
        console.log("Este es el mejor objeto de la tienda");
      },
} 

console.log(producto);

console.log(producto.nombre);
console.log(producto.precio);
console.log("Aumento de precio")
producto.precio = 25000;
console.log(producto.precio);
producto.colores = ["Rojo", "Verde", "Azul"];
console.log(producto)
producto.colores.push("Amarillo");
console.log(producto);
producto["disponibilidad"] = false;
console.log(producto);




//presentar()


producto.mostrar()
