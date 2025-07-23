// 1. Seleccionar los elementos del DOM
const imagenCarrusel = document.getElementById("imagenCarrusel");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

// 2. Definir las imágenes (podrían ser URLs reales)
const imagenes = [
  {
    src: "assets/esfera1.png",
    alt: "Esfera 1 estrella",
  },
  {
    src: "assets/esfera2.png",
    alt: "Esfera 2 estrellas",
  },
  {
    src: "assets/esfera3.png",
    alt: "Esfera 3 estrellas",
  },
  {
    src: "assets/esfera4.png",
    alt: "Esfera 4 estrellas",
  },
  {
    src: "assets/esfera5.png",
    alt: "Esfera 5 estrellas",
  },
  {
    src: "assets/esfera6.png",
    alt: "Esfera 6 estrellas",
  },
  {
    src: "assets/esfera7.png",
    alt: "Esfera 7 estrellas",
  },
];

let indiceActual = 0; // Para llevar la cuenta de qué imagen se muestra

// 3. Función para actualizar la imagen mostrada
function actualizarImagen() {
  imagenCarrusel.src = imagenes[indiceActual].src;
  imagenCarrusel.alt = imagenes[indiceActual].alt;
}

// 4. Añadir Event Listeners a los botones
btnSiguiente.addEventListener("click", () => {
  indiceActual++; // Avanzar al siguiente índice
  // Si llegamos al final, volvemos al principio
  if (indiceActual >= imagenes.length) {
    indiceActual = 0;
  }
  actualizarImagen(); // Actualizar la imagen
});

btnAnterior.addEventListener("click", () => {
  indiceActual--; // Retroceder al índice anterior
  // Si vamos antes del principio, vamos al final
  if (indiceActual < 0) {
    indiceActual = imagenes.length - 1;
  }
  actualizarImagen(); // Actualizar la imagen
});

// Opcional: Cargar la primera imagen al inicio (redundante en este caso, pero buena práctica)
actualizarImagen()
