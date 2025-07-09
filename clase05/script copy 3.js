//alert()
// setItem guarda un valor en localStorage
 localStorage.setItem("nombre", "Adrian");
localStorage.setItem("edad", 30);
localStorage.setItem("alumno", false);
localStorage.setItem("alumnos", ["Sebastian", "Sergio", "Juan"]);
localStorage.setItem("curso", {nombre: "Javascript", horas: 40}) 

// getItem obtiene el valor del localSotorage
/* let nombre = localStorage.getItem("nombre");
let edad = localStorage.getItem("edad");
let alumno = localStorage.getItem("alumno");
let alumnos = localStorage.getItem("alumnos");
let curso = localStorage.getItem("curso"); */
localStorage.setItem("basura", "Esto es basura");
localStorage.setItem("curso", JSON.stringify({ nombre: "Javascript", horas: 40 }));



// soluciones al obtencion de datos y guardado
let nombre = localStorage.getItem("nombre");

let edad = Number(localStorage.getItem("edad"));
edad = parseInt(localStorage.getItem("edad"));
let alumno = (localStorage.getItem("alumno") === "true");
let alumnos = localStorage.getItem("alumnos").split(",");
let curso = JSON.parse(localStorage.getItem("curso"));
let basura = localStorage.getItem("basura")

console.log(nombre);
console.log(typeof nombre);
console.log(edad);
console.log(typeof edad);
console.log(alumno);
console.log(typeof alumno);
console.log(alumnos);
console.log(typeof alumnos);
console.log(alumnos[0]);
console.log(alumnos[1]);
console.log(alumnos[2])
console.log(curso);
console.log(typeof curso);
console.log(curso.nombre)

console.log(basura)



console.log("LocalStorage keys and values:");
console.log(localStorage.key(3));


//console.log(localStorage.key(localStorage.length -1))
//localStorage.removeItem("basura")
//localStorage.removeItem(localStorage.key())
//localStorage.clear();
