const MIN_POWER = 10;
const MAX_POWER = 30;

let energiaGoku = 100;
let energiaSuperman = 100;

let round = 0;

while(energiaGoku > 0 && energiaSuperman > 0) {
round = round + 1;
let golpeGoku = parseInt(
      Math.random() * (MAX_POWER - MIN_POWER) + MIN_POWER
    );

let golpeSuperman = parseInt(
      Math.random() * (MAX_POWER - MIN_POWER) + MIN_POWER
    );

if(golpeGoku === golpeSuperman){
    console.log("Empate, nadie pierde energia");
}else if(golpeGoku < golpeSuperman) {
    energiaGoku = energiaGoku - golpeSuperman;
} else {
    energiaSuperman = energiaSuperman - golpeGoku;
}
console.log("Round " + round)
console.log("Energia de Goku " + energiaGoku);
console.log("Energia de Superman " + energiaSuperman) 
console.log("-----------------------------")
}


if(energiaGoku > energiaSuperman){
    console.log("Ganador Goku")
}else {
    console.log("Ganador Superman")
}
