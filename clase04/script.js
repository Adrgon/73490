// Objeto con un metodo simple utiliza una proppiedad del mimsmo objeto

let persona = {
  nombre: "Ana",
  saludar: function () {
    console.log("Hola, soy " + this.nombre + ".");
  },
};


//console.log(persona.nombre)
persona.saludar()


// Objeto con metodo para modificar una propiedad del mismo objeto

let contador = {
  valor: 0,
  incrementar: function () {
    this.valor++;
  },
};

console.log(contador.valor)
contador.incrementar()
console.log(contador.valor);
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar();
contador.incrementar();
console.log(contador.valor);


const calculadora = {
  sumar: function (a, b) {
    return a + b;
  },
  restar: function (a, b) {
    return a - b;
  },
  multiplicar: function (a, b) {
    return a * b;
  },
  dividir: function (a, b) {
    if (b === 0) {
      console.error("No se puede dividir por cero");
      return null;
    }
    return a / b;
  },
  cuadrado: function (a) {
    return a*a;
  },
};

console.log(calculadora.sumar(10, 3));
console.log(calculadora.restar(10,3))
console.log(calculadora.multiplicar(10,3))
console.log(calculadora.dividir(10,3))
console.log(calculadora.dividir(10,0))
console.log(calculadora.cuadrado(3))



let producto = {
  nombre: "Camiseta",
  precio: 2500,
  obtenerInformacion: function () {
    return "Producto: " + this.nombre + ", Precio: $" + this.precio;
  },
};

console.log(producto.obtenerInformacion())
