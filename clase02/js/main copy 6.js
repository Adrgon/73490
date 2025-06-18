
let efectivo = 3000
let credito = 7001
let disponible = efectivo + credito
let totalCompra = 7000

if(efectivo > totalCompra || credito > totalCompra){
    console.log("Podes pagar con efectivo o credito")
} else if(disponible >= totalCompra){
    console.log("Podes combinar el pago")
}else {
    console.log("No tenes dinero suficiente - Rata")
}
