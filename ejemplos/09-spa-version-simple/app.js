// Aplicación Principal - conecta todos los módulos
import { Router } from './modules/router.js';
import { Paginas } from './modules/pages.js';
import { Navegacion } from './modules/navigation.js';




// Clase principal de la aplicación
class MiSPA {
    constructor() {
        // Crear instancias de cada módulo
        this.router = new Router();
        this.paginas = new Paginas();
        this.navegacion = new Navegacion();
        
        // Configurar la aplicación
        this.configurar();
    }

    // Configurar todas las rutas y funcionalidad
    configurar() {
        console.log('🚀 Iniciando Mi SPA Simple...');
        
        // Configurar las rutas de la aplicación
        this.configurarRutas();
        
        // Dar acceso al router a la navegación
        this.navegacion.router = this.router;
        
        // Iniciar el router
        this.router.iniciar();
        
        console.log('✅ SPA iniciada correctamente');
    }

    // Definir todas las rutas de la aplicación
    configurarRutas() {
        // Ruta de inicio
        this.router.agregarRuta('inicio', () => {
            this.paginas.mostrarInicio();
        });

        // Ruta de acerca de
        this.router.agregarRuta('acerca', () => {
            this.paginas.mostrarAcerca();
        });

        // Ruta de contacto
        this.router.agregarRuta('contacto', () => {
            this.paginas.mostrarContacto();
        });

        // Ruta por defecto (cuando no coincide ninguna)
        this.router.agregarRuta('*', () => {
            console.log('❓ Página no encontrada, redirigiendo a inicio');
            this.router.irA('inicio');
        });
    }

    // Método para navegar programáticamente
    irAPagina(pagina) {
        this.router.irA(pagina);
    }
}

// Función que se ejecuta cuando la página está lista
function iniciarApp() {
    console.log('🌟 DOM cargado, creando aplicación...');
    
    // Crear la aplicación
    const app = new MiSPA();
    
    // Hacer la aplicación disponible globalmente para debugging
    window.miApp = app;
    
    console.log('🎉 ¡Aplicación creada! Usa window.miApp para acceder a ella');
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', iniciarApp);
