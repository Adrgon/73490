// js/script.js

class Producto {
  static nextId = 1; // Propiedad estática para generar IDs automáticamente

  constructor(nombre, precio, cantidad) {
    this.id = Producto.nextId++;
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
    this.subtotal = 0; // Inicializamos subtotal, se calculará con un método
  }

  calcularSubtotal() {
    this.subtotal = this.precio * this.cantidad;
    return this.subtotal;
  }
}

const productos = []; // Array donde se almacenarán los objetos de productos

function agregarProducto() {
  let nombre = prompt("Ingresa el nombre del producto:");
  while (!nombre) {
    alert("El nombre no puede estar vacío.");
    nombre = prompt("Ingresa el nombre del producto:");
  }

  let precio;
  do {
    precio = prompt("Ingresa el precio del producto:");
    if (isNaN(precio) || parseFloat(precio) <= 0) {
      alert("El precio debe ser un número positivo.");
    }
  } while (isNaN(precio) || parseFloat(precio) <= 0);

  let cantidad;
  do {
    cantidad = prompt("Ingresa la cantidad del producto:");
    if (isNaN(cantidad) || parseInt(cantidad) <= 0) {
      alert("La cantidad debe ser un número entero positivo.");
    }
  } while (isNaN(cantidad) || parseInt(cantidad) <= 0);

  const nuevoProducto = new Producto(nombre, precio, cantidad);
  nuevoProducto.calcularSubtotal(); // Calculamos el subtotal al crear el producto
  productos.push(nuevoProducto);

  console.log("--- Producto Agregado ---");
  console.log(`ID: ${nuevoProducto.id}`);
  console.log(`Nombre: ${nuevoProducto.nombre}`);
  console.log(`Precio: $${nuevoProducto.precio.toFixed(2)}`);
  console.log(`Cantidad: ${nuevoProducto.cantidad}`);
  console.log(`Subtotal: $${nuevoProducto.subtotal.toFixed(2)}`);
  console.log("------------------------");
}

function mostrarProductos() {
  console.log("--- Listado de Productos ---");
  if (productos.length === 0) {
    console.log("No hay productos cargados.");
  } else {
    productos.forEach((producto) => {
      console.log(
        `ID: ${producto.id}, Nombre: ${
          producto.nombre
        }, Precio: $${producto.precio.toFixed(2)}, Cantidad: ${
          producto.cantidad
        }, Subtotal: $${producto.subtotal.toFixed(2)}`
      );
    });
  }
  console.log("----------------------------");
}

function iniciarPrograma() {
  let opcion;
  do {
    opcion = prompt(
      "Selecciona una opción:\n" +
        "1. Agregar producto\n" +
        "2. Mostrar todos los productos\n" +
        "3. Salir"
    );

    switch (opcion) {
      case "1":
        agregarProducto();
        break;
      case "2":
        mostrarProductos();
        break;
      case "3":
        console.log("Saliendo del programa. ¡Hasta luego!");
        break;
      default:
        alert("Opción no válida. Por favor, elige 1, 2 o 3.");
        break;
    }
  } while (opcion !== "3");
}

// Inicia el programa cuando se carga el script
iniciarPrograma();
