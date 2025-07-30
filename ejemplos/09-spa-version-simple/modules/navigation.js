// Navegación - manejo del menú y enlaces
export class Navegacion {
    constructor() {
        // Buscar el menú en la página
        this.menu = document.getElementById('menu');
        
        // Configurar eventos cuando se crea la navegación
        this.configurarEventos();
    }

    // Configurar todos los eventos de navegación
    configurarEventos() {
        // Verificar que existe el menú
        if (!this.menu) {
            console.log('No se encontró el menú');
            return;
        }

        // Buscar todos los enlaces del menú
        const enlaces = this.menu.querySelectorAll('a');
        
        // Configurar cada enlace
        enlaces.forEach(enlace => {
            enlace.addEventListener('click', (e) => {
                e.preventDefault(); // Evitar comportamiento normal del enlace
                
                // Obtener la página a la que queremos ir
                const nuevaPagina = enlace.getAttribute('href').replace('#', '');
                
                // Cambiar la página
                this.irAPagina(nuevaPagina);
            });
        });

        // Los cambios de URL son manejados por el router
        // así que no necesitamos listener adicional aquí
    }

    // Ir a una página específica
    irAPagina(pagina) {
        // Usar el router si está disponible
        if (this.router) {
            this.router.irA(pagina);
        } else if (window.miApp && window.miApp.router) {
            window.miApp.router.irA(pagina);
        } else {
            // Fallback: cambiar la URL directamente
            window.location.hash = pagina;
        }
        
        // Actualizar el menú activo después de un pequeño retraso
        setTimeout(() => {
            this.actualizarMenuActivo();
        }, 10);
    }

    // Marcar el enlace activo en el menú
    actualizarMenuActivo() {
        // Obtener la página actual de la URL
        const paginaActual = window.location.hash.replace('#', '') || 'inicio';
        
        // Buscar todos los enlaces del menú
        const enlaces = this.menu.querySelectorAll('a');
        
        // Quitar la clase activa de todos los enlaces
        enlaces.forEach(enlace => {
            enlace.classList.remove('active');
        });
        
        // Buscar el enlace que corresponde a la página actual
        enlaces.forEach(enlace => {
            const hrefPagina = enlace.getAttribute('href').replace('#', '');
            
            // Si este enlace corresponde a la página actual, marcarlo como activo
            if (hrefPagina === paginaActual) {
                enlace.classList.add('active');
            }
        });
    }
}
