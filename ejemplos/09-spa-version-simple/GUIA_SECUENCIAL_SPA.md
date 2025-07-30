# 🚀 Guía Paso a Paso: Construyendo una SPA Simple (Orden Secuencial)

Esta guía te llevará paso a paso para construir una Single Page Application siguiendo un **orden lógico de construcción**. Cada paso construye sobre el anterior, sin hacer referencia a código que aún no existe.

## 📋 Tabla de Contenidos

1. [Configuración Inicial](#configuración-inicial)
2. [Estructura HTML Base](#estructura-html-base)
3. [Estilos CSS Básicos](#estilos-css-básicos)
4. [Aplicación Principal (app.js)](#aplicación-principal-appjs)
5. [Módulo Router](#módulo-router)
6. [Módulo de Páginas](#módulo-de-páginas)
7. [Módulo de Navegación](#módulo-de-navegación)
8. [Conectando Todo](#conectando-todo)
9. [Probando la Aplicación](#probando-la-aplicación)

---

## 🏗️ Configuración Inicial

### Paso 1: Crear la estructura de carpetas

```
version-simple/
├── index.html
├── styles.css
├── app.js
└── modules/
    ├── router.js
    ├── pages.js
    └── navigation.js
```

---

## 📄 Estructura HTML Base

### Paso 2: Crear `index.html`

Empezamos con la estructura básica de nuestra aplicación:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi SPA Simple</title>
    <link rel="stylesheet" href="styles.css">
    <!-- Importante: type="module" para usar módulos -->
    <script type="module" src="app.js" defer></script>
</head>
<body>
    <div id="app">
        <!-- Navegación -->
        <nav id="menu">
            <h1>Mi SPA</h1>
            <ul>
                <li><a href="#inicio" class="nav-link">Inicio</a></li>
                <li><a href="#acerca" class="nav-link">Acerca de</a></li>
                <li><a href="#contacto" class="nav-link">Contacto</a></li>
            </ul>
        </nav>

        <!-- Aquí se muestran las páginas -->
        <main id="contenido">
            <!-- El contenido cambia aquí -->
        </main>

        <!-- Pie de página -->
        <footer>
            <p>&copy; 2025 Mi SPA Simple</p>
        </footer>
    </div>
</body>
</html>
```

### 🎯 Puntos importantes del HTML:
- **`id="menu"`**: El menú de navegación
- **`id="contenido"`**: Donde cambiaremos el contenido de las páginas
- **`type="module"`**: Permite usar import/export
- **`href="#pagina"`**: Enlaces que cambiarán la URL

---

## 🎨 Estilos CSS Básicos

### Paso 3: Crear `styles.css`

Definimos los estilos antes de crear la funcionalidad:

```css
/* Reset básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Estilos del cuerpo */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Contenedor principal */
#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Navegación */
nav {
    background: #4a90e2;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav h1 {
    font-size: 1.5rem;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 1rem;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background 0.3s;
}

nav a:hover,
nav a.active {
    background: rgba(255, 255, 255, 0.2);
}

/* Contenido principal */
main {
    flex: 1;
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
}

.pagina {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    animation: aparecer 0.3s ease-in;
}

@keyframes aparecer {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Pie de página */
footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
    nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    nav ul {
        gap: 0.5rem;
    }
    
    main {
        padding: 1rem;
    }
}
```

### 🎯 Estilos importantes:
- **`.active`**: Para marcar el enlace activo
- **`.pagina`**: Contenedor de cada página con animación
- **Responsive**: Funciona en móviles

---

## 🚀 Aplicación Principal (app.js)

### Paso 4: Crear `app.js` - El punto de entrada

Creamos primero el archivo principal que orquestará todo:

```javascript
// Aplicación Principal - conecta todos los módulos

// Clase principal de la aplicación
class MiSPA {
    constructor() {
        console.log('🚀 Iniciando Mi SPA Simple...');
        
        // Por ahora solo mostramos un mensaje
        this.mostrarMensajeInicial();
        
        console.log('✅ SPA creada correctamente');
    }
    
    // Mostrar mensaje inicial mientras construimos
    mostrarMensajeInicial() {
        const contenido = document.getElementById('contenido');
        if (contenido) {
            contenido.innerHTML = `
                <div class="pagina">
                    <h2>🚧 Construyendo la SPA...</h2>
                    <p>Los módulos se irán agregando paso a paso.</p>
                </div>
            `;
        }
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
```

### 🧪 **Prueba 1**: 
Abre `index.html` en tu navegador. Deberías ver:
- El menú de navegación
- El mensaje "🚧 Construyendo la SPA..."
- En la consola: los logs de inicialización

---

## 🧭 Módulo Router

### Paso 5: Crear `modules/router.js`

Ahora creamos el sistema de rutas:

```javascript
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
        console.log(`📋 Ruta agregada: ${nombre}`);
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
        console.log('🧭 Iniciando router...');
        
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
        } else if (this.rutas['*']) {
            // Usar la ruta por defecto si existe
            this.rutas['*']();
        } else {
            console.log('Página no encontrada:', nombrePagina);
        }
    }
}
```

### Paso 6: Integrar el Router en `app.js`

Actualiza `app.js` para usar el router:

```javascript
// Aplicación Principal - conecta todos los módulos
import { Router } from './modules/router.js';

// Clase principal de la aplicación
class MiSPA {
    constructor() {
        console.log('🚀 Iniciando Mi SPA Simple...');
        
        // Crear el router
        this.router = new Router();
        
        // Configurar rutas básicas
        this.configurarRutasIniciales();
        
        // Iniciar el router
        this.router.iniciar();
        
        console.log('✅ SPA creada correctamente');
    }
    
    // Configurar rutas básicas para probar
    configurarRutasIniciales() {
        // Ruta de inicio (temporal)
        this.router.agregarRuta('inicio', () => {
            this.mostrarPaginaTemporal('Inicio', 'Esta es la página de inicio');
        });

        // Ruta acerca de (temporal)
        this.router.agregarRuta('acerca', () => {
            this.mostrarPaginaTemporal('Acerca de', 'Esta es la página acerca de');
        });

        // Ruta contacto (temporal)
        this.router.agregarRuta('contacto', () => {
            this.mostrarPaginaTemporal('Contacto', 'Esta es la página de contacto');
        });

        // Ruta por defecto
        this.router.agregarRuta('*', () => {
            console.log('❓ Página no encontrada, redirigiendo a inicio');
            this.router.irA('inicio');
        });
    }
    
    // Mostrar página temporal mientras construimos los módulos
    mostrarPaginaTemporal(titulo, contenido) {
        const contenedor = document.getElementById('contenido');
        if (contenedor) {
            contenedor.innerHTML = `
                <div class="pagina">
                    <h2>${titulo}</h2>
                    <p>${contenido}</p>
                    <p><em>📋 Router funcionando correctamente</em></p>
                </div>
            `;
        }
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
```

### 🧪 **Prueba 2**: 
Recarga el navegador. Ahora deberías poder:
- Cambiar la URL escribiendo `#acerca` o `#contacto`
- Ver que cambia el contenido
- Ver logs en la consola

---

## 📄 Módulo de Páginas

### Paso 7: Crear `modules/pages.js`

Ahora creamos el módulo para el contenido de las páginas:

```javascript
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

            <div style="margin-top: 2rem; padding: 1.5rem; background: #fff8e1; border-radius: 8px; border-left: 4px solid #ffa726;">
                <h3>💬 Redes Sociales</h3>
                <p><strong>Twitter:</strong> @MiSpaSimple</p>
                <p><strong>LinkedIn:</strong> Mi SPA Simple</p>
                <p><strong>GitHub:</strong> github.com/mispa</p>
            </div>

            <div style="margin-top: 2rem; padding: 1.5rem; background: #f1f8e9; border-radius: 8px; border-left: 4px solid #66bb6a;">
                <h3>🕒 Horarios de Atención</h3>
                <p><strong>Lunes a Viernes:</strong> 9:00 AM - 6:00 PM</p>
                <p><strong>Sábados:</strong> 10:00 AM - 2:00 PM</p>
                <p><strong>Domingos:</strong> Cerrado</p>
            </div>

            <p style="margin-top: 2rem; font-style: italic; color: #666;">
                ¡Esperamos tu mensaje! Normalmente respondemos en menos de 24 horas.
            </p>
        `;
        
        this.mostrar(contenido);
    }
}
```

### Paso 8: Integrar Páginas en `app.js`

Actualiza `app.js` para usar el módulo de páginas:

```javascript
// Aplicación Principal - conecta todos los módulos
import { Router } from './modules/router.js';
import { Paginas } from './modules/pages.js';

// Clase principal de la aplicación
class MiSPA {
    constructor() {
        console.log('🚀 Iniciando Mi SPA Simple...');
        
        // Crear instancias de los módulos
        this.router = new Router();
        this.paginas = new Paginas();
        
        // Configurar rutas con contenido real
        this.configurarRutas();
        
        // Iniciar el router
        this.router.iniciar();
        
        console.log('✅ SPA creada correctamente');
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
```

### 🧪 **Prueba 3**: 
Recarga el navegador. Ahora deberías ver:
- Contenido real en cada página
- Las páginas cambian al modificar la URL
- Todo funciona pero el menú no se actualiza visualmente

---

## 🔗 Módulo de Navegación

### Paso 9: Crear `modules/navigation.js`

Ahora agregamos la funcionalidad para el menú:

```javascript
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
```

---

## 🔗 Conectando Todo

### Paso 10: Integración final en `app.js`

Ahora conectamos todos los módulos:

```javascript
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
```

### Paso 11: Actualizar el Router para sincronizar con navegación

Actualiza `modules/router.js` para que actualice automáticamente el menú:

```javascript
// En el método cambiarPagina, después de ejecutar la función de la página:
// Actualizar menú si hay navegación disponible
if (window.miApp && window.miApp.navegacion) {
    setTimeout(() => {
        window.miApp.navegacion.actualizarMenuActivo();
    }, 10);
}
```

---

## 🧪 Probando la Aplicación

### Paso 12: Prueba final

Recarga el navegador y verifica que:

✅ **Navegación con clics**: Haz clic en los enlaces del menú  
✅ **URL dinámica**: Ve cómo cambia la URL pero no recarga la página  
✅ **Menú activo**: El enlace actual se resalta  
✅ **Botones navegador**: Los botones atrás/adelante funcionan  
✅ **Responsive**: Cambia el tamaño de la ventana  
✅ **Consola**: Abre la consola y escribe `miApp` para explorar  

---

## 🎯 ¿Qué Hemos Aprendido?

### 📦 **Flujo de Construcción**
1. **HTML base** → Estructura y elementos necesarios
2. **CSS** → Estilos antes de la funcionalidad
3. **App principal** → Punto de entrada y orquestación
4. **Router** → Sistema de rutas funcional paso a paso
5. **Páginas** → Contenido organizado en módulos
6. **Navegación** → Interactividad del menú
7. **Integración** → Conectar todos los módulos

### 🧱 **Arquitectura Modular**
- Cada módulo tiene una responsabilidad específica
- Los módulos se comunican a través de la aplicación principal
- Código fácil de mantener y expandir

### 💡 **Conceptos Clave**
- **Módulos ESM**: Import/export para organizar código
- **Single Page Application**: Cambio de contenido sin recargar
- **Hash routing**: URLs que funcionan sin servidor
- **Event delegation**: Manejo eficiente de eventos

---

## 🚀 Próximos Pasos

Una vez que domines esta estructura secuencial, puedes:

1. **Agregar más páginas** siguiendo el mismo patrón
2. **Mejorar la validación** de rutas
3. **Añadir animaciones** más elaboradas
4. **Implementar localStorage** para guardar estado
5. **Crear componentes reutilizables**

---

## 💡 Ventajas de esta Guía Secuencial

✅ **Sin referencias futuras**: Cada paso solo usa código ya escrito  
✅ **Pruebas incrementales**: Puedes probar en cada paso  
✅ **Comprensión gradual**: Builds understanding step by step  
✅ **Debugging fácil**: Sabes exactamente dónde está cada pieza  
✅ **Flujo lógico**: Sigue el orden natural de construcción  

¡Ahora tienes una guía que realmente puedes seguir paso a paso sin confusiones! 🎉
