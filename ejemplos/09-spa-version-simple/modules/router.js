// Router simple - maneja las páginas

export class Router {
    constructor() {
        // Objeto simple para guardar las páginas
        this.rutas = {};
        this.paginaActual = 'inicio';
    }

    // Agregar una nueva página
    agregarRuta(nombre, funcion) {
        this.rutas[nombre] = funcion;
    }

    // Ir a una página específica
    irA(nombrePagina) {
        // Verificar si la página existe
        if (this.rutas[nombrePagina]) {
            // Cambiar la URL (esto disparará hashchange si es diferente)
            window.location.hash = nombrePagina;
            
            // Si la URL no cambió (misma página), cambiar manualmente
            if (this.obtenerPaginaActual() === nombrePagina) {
                this.cambiarPagina(nombrePagina);
            }
        } else {
            console.log('Página no encontrada:', nombrePagina);
            // Si no existe, ir al inicio (solo si no estamos ya en inicio)
            if (nombrePagina !== 'inicio') {
                this.irA('inicio');
            }
        }
    }

    // Obtener la página actual desde la URL
    obtenerPaginaActual() {
        // Obtener la parte después del # en la URL
        const hash = window.location.hash.replace('#', '');
        return hash || 'inicio'; // Si no hay hash, usar 'inicio'
    }

    // Inicializar el router
    iniciar() {
        // Escuchar cuando cambie la URL (botones atrás/adelante del navegador)
        window.addEventListener('hashchange', () => {
            const pagina = this.obtenerPaginaActual();
            // Solo cambiar si es diferente a la página actual
            if (pagina !== this.paginaActual) {
                this.cambiarPagina(pagina);
            }
        });

        // Cargar la página inicial
        const paginaInicial = this.obtenerPaginaActual();
        this.cambiarPagina(paginaInicial);
    }
    
    // Cambiar página sin tocar la URL (para evitar bucles)
    cambiarPagina(nombrePagina) {
        // Verificar si la página existe
        if (this.rutas[nombrePagina]) {
            this.paginaActual = nombrePagina;
            // Ejecutar la función de la página
            this.rutas[nombrePagina]();
            
            // Actualizar menú si hay navegación disponible
            if (window.miApp && window.miApp.navegacion) {
                setTimeout(() => {
                    window.miApp.navegacion.actualizarMenuActivo();
                }, 10);
            }
        } else if (this.rutas['*']) {
            // Usar la ruta por defecto si existe
            this.rutas['*']();
        } else {
            console.log('Página no encontrada:', nombrePagina);
        }
    }
}
