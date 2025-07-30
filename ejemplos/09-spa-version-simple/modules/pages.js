// Páginas - contenido de cada página
export class Paginas {
    constructor() {
        // Buscar el elemento donde mostraremos las páginas
        this.contenedor = document.getElementById('contenido');
    }

    // Mostrar contenido en la página
    mostrar(contenidoHTML) {
        if (this.contenedor) {
            this.contenedor.innerHTML = `<div class="pagina">${contenidoHTML}</div>`;
        }
    }

    // Página de Inicio
    mostrarInicio() {
        const contenido = `
            <h2>¡Bienvenido a Mi SPA!</h2>
            <p>Esta es una Single Page Application (SPA) muy simple.</p>
            <p>¿Qué es una SPA?</p>
            <ul>
                <li>✅ Las páginas cambian sin recargar el navegador</li>
                <li>✅ Es más rápida que un sitio web tradicional</li>
                <li>✅ Ofrece una mejor experiencia al usuario</li>
                <li>✅ Está hecha con HTML, CSS y JavaScript</li>
            </ul>
            <p>Navega por las diferentes secciones usando el menú de arriba.</p>
        `;
        
        this.mostrar(contenido);
    }

    // Página Acerca de
    mostrarAcerca() {
        const contenido = `
            <h2>Acerca de Este Proyecto</h2>
            <p>Esta SPA está construida con tecnologías web simples:</p>
            
            <h3>🛠️ Tecnologías Usadas</h3>
            <ul>
                <li><strong>HTML5:</strong> Estructura de la página</li>
                <li><strong>CSS3:</strong> Estilos y diseño</li>
                <li><strong>JavaScript ES6:</strong> Funcionalidad interactiva</li>
                <li><strong>Módulos ESM:</strong> Organización del código</li>
            </ul>

            <h3>📚 Lo que Aprendes</h3>
            <ul>
                <li>Cómo crear una SPA sin frameworks</li>
                <li>Organizar código con módulos</li>
                <li>Manejo de rutas simples</li>
                <li>JavaScript moderno pero fácil de entender</li>
            </ul>

            <p>Esta es una excelente base para aprender conceptos más avanzados.</p>
        `;
        
        this.mostrar(contenido);
    }

    // Página de Contacto
    mostrarContacto() {
        const contenido = `
            <h2>Contacto</h2>
            <p>¿Tienes alguna pregunta o quieres conocer más sobre este proyecto?</p>
            <p>¡Nos encantaría saber de ti!</p>
            
            <div style="margin-top: 2rem; padding: 1.5rem; background: #f0f8ff; border-radius: 8px; border-left: 4px solid #4a90e2;">
                <h3>📧 Información de Contacto</h3>
                <p><strong>📬 Email:</strong> contacto@mispa.com</p>
                <p><strong>📞 Teléfono:</strong> +34 123 456 789</p>
                <p><strong>🌍 Sitio Web:</strong> www.mispa.com</p>
                <p><strong>📍 Ubicación:</strong> Madrid, España</p>
            </div>

            <p style="margin-top: 2rem; font-style: italic; color: #666;">
                ¡Esperamos tu mensaje! Normalmente respondemos en menos de 24 horas.
            </p>
        `;
        
        this.mostrar(contenido);
    }
}
