// 1. Seleccionar el botón y el elemento <body> (o el que quieras cambiar de tema)
const btnModoOscuro = document.getElementById("btnModoOscuro");
const body = document.body; // El <body> es un elemento muy común para cambiar el tema global

// 2. Añadir un Event Listener para el clic del botón
btnModoOscuro.addEventListener("click", () => {
  // 3. Alternar la clase 'dark-mode' en el body
  // Si el body NO tiene la clase 'dark-mode', se la añade.
  // Si el body SÍ tiene la clase 'dark-mode', se la quita.
  body.classList.toggle("dark-mode");

  // Opcional: Guardar la preferencia en localStorage para que persista
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("tema", "dark");
  } else {
    localStorage.setItem("tema", "light");
  }
});

// Opcional: Aplicar el tema guardado al cargar la página
const temaGuardado = localStorage.getItem("tema");
if (temaGuardado === "dark") {
  body.classList.add("dark-mode");
} else {
  // Asegurarse de que no haya un modo oscuro residual si la preferencia es light
  body.classList.remove("dark-mode");
}
