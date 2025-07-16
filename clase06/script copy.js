//alert()
// funciones que reciben funciones como parametro (Hight Order Functions)
function saludar(nombre){
    console.log("Hola! " + nombre );
}

function ejecutarAccion(callback){
    console.log("Ejecutando acción...");
    callback("Juan");
    //saludar("juan")
    //"adrian"()
    //1()
    console.log("Acción ejecutada.");
}


ejecutarAccion(saludar)
