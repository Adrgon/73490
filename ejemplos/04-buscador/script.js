// El array de autos (copiar de tu enunciado)
const autos = [
  {
    marca: "BMW",
    modelo: "Serie 3",
    year: 2020,
    precio: 30000,
    puertas: 4,
    color: "Blanco",
    transmision: "automatico",
  },
  {
    marca: "Audi",
    modelo: "A4",
    year: 2020,
    precio: 40000,
    puertas: 4,
    color: "Negro",
    transmision: "automatico",
  },
  {
    marca: "Ford",
    modelo: "Mustang",
    year: 2015,
    precio: 20000,
    puertas: 2,
    color: "Blanco",
    transmision: "automatico",
  },
  {
    marca: "Audi",
    modelo: "A6",
    year: 2020,
    precio: 35000,
    puertas: 4,
    color: "Negro",
    transmision: "automatico",
  },
  {
    marca: "BMW",
    modelo: "Serie 5",
    year: 2016,
    precio: 70000,
    puertas: 4,
    color: "Rojo",
    transmision: "automatico",
  },
  {
    marca: "Mercedes Benz",
    modelo: "Clase C",
    year: 2015,
    precio: 25000,
    puertas: 4,
    color: "Blanco",
    transmision: "automatico",
  },
  {
    marca: "Chevrolet",
    modelo: "Camaro",
    year: 2018,
    precio: 60000,
    puertas: 2,
    color: "Rojo",
    transmision: "manual",
  },
  {
    marca: "Ford",
    modelo: "Mustang",
    year: 2019,
    precio: 80000,
    puertas: 2,
    color: "Rojo",
    transmision: "manual",
  },
  {
    marca: "Dodge",
    modelo: "Challenger",
    year: 2020,
    precio: 40000,
    puertas: 4,
    color: "Blanco",
    transmision: "automatico",
  },
  {
    marca: "Audi",
    modelo: "A3",
    year: 2017,
    precio: 55000,
    puertas: 2,
    color: "Negro",
    transmision: "manual",
  },
  {
    marca: "Dodge",
    modelo: "Challenger",
    year: 2020,
    precio: 25000,
    puertas: 2,
    color: "Rojo",
    transmision: "manual",
  },
  {
    marca: "Mercedes Benz",
    modelo: "Clase C",
    year: 2018,
    precio: 45000,
    puertas: 4,
    color: "Azul",
    transmision: "automatico",
  },
  {
    marca: "BMW",
    modelo: "Serie 5",
    year: 2019,
    precio: 90000,
    puertas: 4,
    color: "Blanco",
    transmision: "automatico",
  },
  {
    marca: "Ford",
    modelo: "Mustang",
    year: 2017,
    precio: 60000,
    puertas: 2,
    color: "Negro",
    transmision: "manual",
  },
  {
    marca: "Dodge",
    modelo: "Challenger",
    year: 2015,
    precio: 35000,
    puertas: 2,
    color: "Azul",
    transmision: "automatico",
  },
  {
    marca: "BMW",
    modelo: "Serie 3",
    year: 2018,
    precio: 50000,
    puertas: 4,
    color: "Blanco",
    transmision: "automatico",
  },
  {
    marca: "BMW",
    modelo: "Serie 5",
    year: 2017,
    precio: 80000,
    puertas: 4,
    color: "Negro",
    transmision: "automatico",
  },
  {
    marca: "Mercedes Benz",
    modelo: "Clase C",
    year: 2018,
    precio: 40000,
    puertas: 4,
    color: "Blanco",
    transmision: "automatico",
  },
  {
    marca: "Audi",
    modelo: "A4",
    year: 2016,
    precio: 30000,
    puertas: 4,
    color: "Azul",
    transmision: "automatico",
  },
];

// Objeto para almacenar los criterios de búsqueda (estado de la interfaz)
const datosBusqueda = {
  marca: "",
  year: "",
  precioMin: "",
  precioMax: "",
};

// 1. Seleccionar los elementos del DOM
const selectMarca = document.getElementById("marca");
const selectYear = document.getElementById("year");
const inputPrecioMin = document.getElementById("precioMin");
const inputPrecioMax = document.getElementById("precioMax");
const btnLimpiar = document.getElementById("btnLimpiar");
const resultadoDiv = document.getElementById("resultado");

  // Al cargar la página, llenamos los selects y mostramos todos los autos
llenarSelects();
mostrarAutos(autos); // Mostrar todos los autos al inicio


selectMarca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAutos(); // Cada vez que cambia un filtro, filtramos
});

selectYear.addEventListener("change", (e) => {
  datosBusqueda.year = parseInt(e.target.value); // Convertir a número
  filtrarAutos();
});

inputPrecioMin.addEventListener("input", (e) => {
  datosBusqueda.precioMin = parseFloat(e.target.value); // Convertir a número
  filtrarAutos();
});

inputPrecioMax.addEventListener("input", (e) => {
  datosBusqueda.precioMax = parseFloat(e.target.value); // Convertir a número
  filtrarAutos();
});

btnLimpiar.addEventListener("click", () => {
  // Resetear el objeto de búsqueda
  datosBusqueda.marca = "";
  datosBusqueda.year = "";
  datosBusqueda.precioMin = "";
  datosBusqueda.precioMax = "";

  // Resetear los selects e inputs en la interfaz
  selectMarca.value = "";
  selectYear.value = "";
  inputPrecioMin.value = "";
  inputPrecioMax.value = "";

  filtrarAutos(); // Volver a mostrar todos los autos
});

// --- Funciones del Buscador ---

// Función para mostrar los autos en el DOM
function mostrarAutos(autosFiltrados) {
  // Limpiar resultados anteriores
  limpiarHTML();

  if (autosFiltrados.length > 0) {
    autosFiltrados.forEach((auto) => {
      const autoHTML = document.createElement("div");
      autoHTML.classList.add("card-auto"); // Añadir clase para estilos

      autoHTML.innerHTML = `
                  <h3>${auto.marca} ${auto.modelo}</h3>
                  <p><strong>Año:</strong> ${auto.year}</p>
                  <p><strong>Precio:</strong> $${auto.precio}</p>
                  <p><strong>Puertas:</strong> ${auto.puertas}</p>
                  <p><strong>Color:</strong> ${auto.color}</p>
                  <p><strong>Transmisión:</strong> ${auto.transmision}</p>
              `;
      resultadoDiv.appendChild(autoHTML); // Añadir al contenedor de resultados
    });
  } else {
    const noResultados = document.createElement("p");
    noResultados.textContent = "No se encontraron autos con esos criterios.";
    noResultados.classList.add("no-resultados");
    resultadoDiv.appendChild(noResultados);
  }
}

// Función para limpiar el HTML de los resultados
function limpiarHTML() {
  while (resultadoDiv.firstChild) {
    resultadoDiv.removeChild(resultadoDiv.firstChild);
  }
}

// Función para llenar los selects de Marca y Año dinámicamente
function llenarSelects() {
  // Llenar marcas (asegurarse de que no haya duplicados y que estén ordenadas)
  const marcasUnicas = [...new Set(autos.map((auto) => auto.marca))].sort();
  marcasUnicas.forEach((marca) => {
    const option = document.createElement("option");
    option.value = marca;
    option.textContent = marca;
    selectMarca.appendChild(option);
  });

  // Llenar años (obtener años únicos y ordenarlos de mayor a menor)
  const yearsUnicos = [...new Set(autos.map((auto) => auto.year))].sort(
    (a, b) => b - a
  );
  yearsUnicos.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    selectYear.appendChild(option);
  });
}

// Función principal de filtrado (usa las HOFs)
function filtrarAutos() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarPrecioMin)
    .filter(filtrarPrecioMax);

  mostrarAutos(resultado);
}

// --- Funciones de filtrado individuales (callbacks para .filter()) ---

function filtrarMarca(auto) {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  }
  return true;
}

function filtrarYear(auto) {
  if (datosBusqueda.year) {
    return auto.year === datosBusqueda.year;
  }
  return true;
}

function filtrarPrecioMin(auto) {
  if (datosBusqueda.precioMin) {
    return auto.precio >= datosBusqueda.precioMin;
  }
  return true;
}

function filtrarPrecioMax(auto) {
  if (datosBusqueda.precioMax) {
    return auto.precio <= datosBusqueda.precioMax;
  }
  return true;
}
