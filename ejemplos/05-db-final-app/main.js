// dom-eventos.js
// Proyecto DOM y Eventos para simulador de peleas Dragon Ball

// Cargar datos desde JSON y usar SweetAlert2
let personajes = [];
let ataquesPorPersonaje = {};

async function cargarDatos() {
  try {
    const resp = await fetch("datos.json");
    if (!resp.ok) throw new Error("No se pudo cargar datos.json");
    const data = await resp.json();
    personajes = data.personajes;
    ataquesPorPersonaje = data.ataquesPorPersonaje;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error al cargar datos",
      text: error.message,
    });
    throw error;
  }
}

class Ataque {
  constructor(nombre, poder) {
    this.nombre = nombre;
    this.poder = poder;
  }
}
class Personaje {
  constructor(nombre, ataques) {
    this.nombre = nombre;
    this.ataques = ataques.map((a) => new Ataque(a.nombre, a.poder));
    this.energia = 100;
  }
  ataqueAleatorio() {
    return this.ataques[Math.floor(Math.random() * this.ataques.length)];
  }
}

// DOM Elements
const selectPersonaje = document.getElementById("personaje");
const btnIniciar = document.getElementById("iniciar");
const divBatalla = document.getElementById("batalla");
const divSeleccion = document.getElementById("seleccion-personaje");
const logDiv = document.getElementById("log");
const vsH2 = document.getElementById("vs");
const btnReiniciar = document.getElementById("reiniciar");
const listaHistorial = document.getElementById("lista-historial");

// Llenar select de personajes
document.addEventListener("DOMContentLoaded", async () => {
  await cargarDatos();
  personajes.forEach((nombre) => {
    const option = document.createElement("option");
    option.value = nombre;
    option.textContent = nombre;
    selectPersonaje.appendChild(option);
  });
  mostrarHistorial();
});

btnIniciar.addEventListener("click", async () => {
  try {
    if (!personajes.length) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "No hay personajes cargados.",
      });
      return;
    }
    const elegido = selectPersonaje.value;
    const miPersonaje = new Personaje(elegido, ataquesPorPersonaje[elegido]);
    // Rival aleatorio
    const rivales = personajes.filter((p) => p !== elegido);
    const rivalNombre = rivales[Math.floor(Math.random() * rivales.length)];
    const rival = new Personaje(rivalNombre, ataquesPorPersonaje[rivalNombre]);

    divSeleccion.style.display = "none";
    divBatalla.style.display = "block";
    vsH2.textContent = `${miPersonaje.nombre} vs ${rival.nombre}`;
    logDiv.innerHTML = "";

    let round = 0;
    const logList = document.createElement("div");
    logList.style.display = "flex";
    logList.style.flexDirection = "column";
    logList.style.gap = "16px";
    logList.style.margin = "20px 0";
    while (miPersonaje.energia > 0 && rival.energia > 0) {
      round++;
      const ataqueJugador = miPersonaje.ataqueAleatorio();
      const ataqueRival = rival.ataqueAleatorio();
      let card = document.createElement("div");
      card.className = "batalla-card";
      if (ataqueJugador.poder === ataqueRival.poder) {
        card.innerHTML = `<strong>Round ${round}:</strong><br>Empate, ambos usaron ataques de <b>${ataqueJugador.poder}</b> de poder.`;
      } else if (ataqueJugador.poder > ataqueRival.poder) {
        rival.energia -= ataqueJugador.poder;
        card.innerHTML = `<strong>Round ${round}:</strong><br><span class='batalla-jugador'>${miPersonaje.nombre}</span> usa <b>${ataqueJugador.nombre}</b> (${ataqueJugador.poder}) y ataca a <span class='batalla-rival'>${rival.nombre}</span>.<br>Energía de <span class='batalla-rival'>${rival.nombre}</span>: <b>${rival.energia}</b>`;
      } else {
        miPersonaje.energia -= ataqueRival.poder;
        card.innerHTML = `<strong>Round ${round}:</strong><br><span class='batalla-rival'>${rival.nombre}</span> usa <b>${ataqueRival.nombre}</b> (${ataqueRival.poder}) y ataca a <span class='batalla-jugador'>${miPersonaje.nombre}</span>.<br>Energía de <span class='batalla-jugador'>${miPersonaje.nombre}</span>: <b>${miPersonaje.energia}</b>`;
      }
      logList.appendChild(card);
      logDiv.innerHTML = "";
      logDiv.appendChild(logList);
      await new Promise((res) => setTimeout(res, 1500)); // Temporizador entre rounds
    }
    let resultado = {};
    let cardFinal = document.createElement("div");
    cardFinal.className = "batalla-card batalla-final";
    if (miPersonaje.energia > 0) {
      cardFinal.innerHTML = `<strong>¡${miPersonaje.nombre} gana la pelea!</strong>`;
      resultado = { ganador: miPersonaje.nombre, perdedor: rival.nombre };
    } else {
      cardFinal.innerHTML = `<strong>¡${rival.nombre} gana la pelea!</strong>`;
      resultado = { ganador: rival.nombre, perdedor: miPersonaje.nombre };
    }
    resultado.fecha = new Date().toLocaleString();
    logList.appendChild(cardFinal);
    logDiv.innerHTML = "";
    logDiv.appendChild(logList);
    await Swal.fire({
      icon: "success",
      title: "¡Pelea finalizada!",
      text: `${resultado.ganador} ha ganado la pelea contra ${resultado.perdedor}`,
    });
    guardarEnHistorial(resultado);
    mostrarHistorial();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error en la simulación",
      text: error.message,
    });
    logDiv.innerHTML = `<div class="batalla-card batalla-final" style="background:#ffcccc; border-left:5px solid #c0392b; color:#c0392b;">Ocurrió un error inesperado en la simulación. Intenta nuevamente.<br><small>${error.message}</small></div>`;
  }
});

btnReiniciar.addEventListener("click", () => {
  divBatalla.style.display = "none";
  divSeleccion.style.display = "block";
});

function guardarEnHistorial(resultado) {
  let historial = JSON.parse(localStorage.getItem("historialPeleas") || "[]");
  historial.push(resultado);
  localStorage.setItem("historialPeleas", JSON.stringify(historial));
}

function mostrarHistorial() {
  let historial = JSON.parse(localStorage.getItem("historialPeleas") || "[]");
  listaHistorial.innerHTML = "";
  if (historial.length === 0) {
    listaHistorial.innerHTML = "<li>No hay peleas registradas.</li>";
    return;
  }
  historial
    .slice(-10)
    .reverse()
    .forEach((r, i) => {
      const li = document.createElement("li");
      li.textContent = `${historial.length - i}. Ganador: ${
        r.ganador
      }, Perdedor: ${r.perdedor}, Fecha: ${r.fecha}`;
      listaHistorial.appendChild(li);
    });
}
