// Tipo 2
// HOF

function crearFuncionDeSaludo(tipoSaludo){
    return function(nombre){
        console.log(tipoSaludo + " " + nombre)
    }
}

const sayHello = crearFuncionDeSaludo("Hello");
const despedirse = crearFuncionDeSaludo("Chao");
const decirHola = crearFuncionDeSaludo("Hola");
//console.log(decirHola) // la funcion
//console.log(typeof decirHola)
decirHola("Juan")

console.log("----------------------------------")

//console.log(sayHello); // la funcion
//console.log(typeof sayHello);
sayHello("Franco");


console.log("----------------------------------");

despedirse("Dylan");




/* function hacerAlgo(){
    console.log("Haciendo algo...");
}


console.log(hacerAlgo()) */
