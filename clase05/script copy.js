//alert()

const cliente1 = {
    nombre: "Martin",
    apellido: "Perez",
    saldo: 1000,
}

const cliente2 = {
    non_ape: "Diana Mottura",
    saldo: 3000,
}

const clientes = [cliente1, cliente2]


// funciones constructoras --> 
function Cliente(nombre, apellido, saldo){
    this.nombre = nombre;
    this.apellido = apellido;
    this.saldo = saldo;
    this.activo = true;
    this.telefonos = [];

    this.agregarTelefono = function(tel){
        this.telefonos.push(tel)
    }

    this.bajaCliente = function(){
        this.activo = false;
    }

}

const cliente3 = new Cliente("Adrian", "Gonzalez", 1000);
const cliente4 = new Cliente("Diana", "Mottura", 3000);

console.log("objetos literales individuales")
console.log(cliente1);
console.log(cliente2);
console.log("objetos literales con la fabrica de objetos");
console.log(cliente3);
console.log(cliente4);

console.log("Operaciones con objetos literales")
cliente1.activo = true;
console.log(cliente1)

clientes.push(cliente3);
clientes.push(cliente4);
console.log(clientes);
console.table(clientes)

for(let i=0; i<clientes.length; i+=1){
    console.log('Cliente ' +i+1 + ':' + clientes[i].nombre + ' ' +  clientes[i].apellido + '- Saldo: $' + clientes[i].saldo);
}

cliente4.agregarTelefono("115555-5555");
cliente4.agregarTelefono("114444-5555");

cliente3.bajaCliente();

console.log(cliente4);
console.log(cliente3);


console.log("Fabrica de super heroes")

function SuperHeroe(nombre, poder, alterEgo) {
  this.nombre = nombre;
  this.poder = poder;
  this.alterEgo = alterEgo;

  this.atacar = function () {
    console.log(this.alterEgo + " ataca con " + this.poder);
  };
}

for (let i = 0; i < 3; i += 1) {
  let nombre = prompt("Ingrese el nombre del superhéroe:");
  let poder = prompt("Ingrese el poder del superhéroe:");
  let alterEgo = prompt("Ingrese el alter ego del superhéroe:");
  const heroe = new SuperHeroe(nombre, poder, alterEgo);
  console.log(heroe.atacar());
}

// clases  : Sugar Sintax -> Ecribilo bonito, escribilo facil




// localStorage sessionStorage
