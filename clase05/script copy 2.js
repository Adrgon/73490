class Cliente { // El nombre de una clase debe comensar con mayusculas ... CLASS DECLARATION
    constructor(nombre, saldo){
        this.nombre = nombre;
        this.saldo = saldo;
        this.activo = true;
    }

    depositar(monto){
        //this.saldo = this.saldo + monto;
        this.saldo += monto
    }

    retirar(monto){
        if(this.saldo >= monto){
            this.saldo -= monto;
        } else {
            console.log("Saldo insuficiente");
        }
    }

    toggleActivo(){
        this.activo = !this.activo;
    }

}

const cuentaNicolas = new Cliente("Nicolas", 1000);
const cuentaGonzalo = new Cliente("Gonzalo", 500);



cuentaNicolas.depositar(300);
cuentaGonzalo.retirar(1000);


console.log(cuentaNicolas)
console.log(cuentaNicolas.saldo)

cuentaNicolas.toggleActivo()
console.log(cuentaNicolas.activo)

cuentaNicolas.toggleActivo();
console.log(cuentaNicolas.activo);

cuentaNicolas.toggleActivo();
console.log(cuentaNicolas.activo);

cuentaNicolas.toggleActivo();
console.log(cuentaNicolas.activo);

cuentaNicolas.toggleActivo();
console.log(cuentaNicolas.activo);

cuentaNicolas.toggleActivo();
console.log(cuentaNicolas.activo);
