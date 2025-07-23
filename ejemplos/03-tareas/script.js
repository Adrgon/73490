// 1. Seleccionar los elementos del DOM
const nuevaTareaInput = document.getElementById("nuevaTareaInput");
const btnAgregarTarea = document.getElementById("btnAgregarTarea");
const listaTareas = document.getElementById("listaTareas");
//console.log(btnAgregarTarea)
// 2. Función para cargar tareas desde localStorage
function cargarTareas() {
  const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareasGuardadas.forEach((tareaTexto) => {
    agregarTareaAlDOM(tareaTexto);
  });
}

// 3. Función para guardar tareas en localStorage
function guardarTareas() {
  // Obtener todas las tareas del DOM
  const elementosTarea = listaTareas.querySelectorAll("li span");
  const tareasActuales = [];
  elementosTarea.forEach((span) => {
    tareasActuales.push(span.textContent);
  });
  localStorage.setItem("tareas", JSON.stringify(tareasActuales));
}

// 4. Función para agregar una tarea al DOM (y guardar)
function agregarTareaAlDOM(tareaTexto) {
  if (tareaTexto.trim() === "") {
    alert("La tarea no puede estar vacía.");
    return;
  }

  const li = document.createElement("li"); // Crear <li>

  const span = document.createElement("span"); // Crear <span> para el texto
  span.textContent = tareaTexto;
  li.appendChild(span);

  const btnEliminar = document.createElement("button"); // Crear botón de eliminar
  btnEliminar.textContent = "Eliminar";
  btnEliminar.classList.add("eliminar"); // Añadir clase para estilos CSS
  li.appendChild(btnEliminar);

  listaTareas.appendChild(li); // Añadir <li> a la <ul>

  // Añadir event listener al botón de eliminar
  btnEliminar.addEventListener("click", (event) => {
    // event.target es el botón. parentElement es el <li> padre.
    listaTareas.removeChild(event.target.parentElement);
    guardarTareas(); // Guardar cambios después de eliminar
  });

  guardarTareas(); // Guardar cambios después de añadir
}

// 5. Añadir Event Listener para el botón "Agregar Tarea"
btnAgregarTarea.addEventListener("click", () => {
  const tareaTexto = nuevaTareaInput.value;
  agregarTareaAlDOM(tareaTexto);
  nuevaTareaInput.value = ""; // Limpiar el input
});

// Opcional: Permitir agregar tarea presionando Enter en el input
nuevaTareaInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    btnAgregarTarea.click(); // Simular clic en el botón
  }
});

// 6. Cargar las tareas al iniciar la página
cargarTareas();
