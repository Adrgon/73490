const MIN_POWER = 10;
const MAX_POWER = 30;

let energiaGoku = 100;
let energiaSuperman = 100;

function calcularGolpe(max, min){
  return parseInt(Math.random() * (max - min) + min);
}

function ambosSiguenVivos() {
  return energiaGoku > 0 && energiaSuperman > 0; // retorna un verdadero o falso
}

function gokuSigueVivo(){
  return energiaGoku > energiaSuperman;
}

function renderizarResultado() {
  console.log("Round " + round);
  console.log("Energia de Goku " + energiaGoku);
  console.log("Energia de Superman " + energiaSuperman);
  console.log("-----------------------------");
}

calcularGolpe()

let round = 0;

while (ambosSiguenVivos()) {
  round = round + 1;
  let golpeGoku = calcularGolpe(MAX_POWER, MIN_POWER)

  let golpeSuperman = calcularGolpe()

  if (golpeGoku === golpeSuperman) {
    console.log("Empate, nadie pierde energia");
  } else if (golpeGoku < golpeSuperman) {
    energiaGoku = energiaGoku - golpeSuperman;
  } else {
    energiaSuperman = energiaSuperman - golpeGoku;
  }
  renderizarResultado();
}

if (gokuSigueVivo()) {
  console.log("Ganador Goku");
} else {
  console.log("Ganador Superman");
}
