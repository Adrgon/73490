const API_URL = 'https://dragonball-api.com/api/characters';
let allCharacters = []; // Cache de todos los personajes
let searchTimeout; // Para el debounce

// Función para crear tarjeta de personaje
function createCharacterCard(character) {
    return `
        <div class="character-card">
            <img class="character-image" 
                 src="${character.image || 'https://via.placeholder.com/200x200?text=Sin+Imagen'}" 
                 alt="${character.name}">
            <h3 class="character-name">${character.name}</h3>
            <div class="character-info">
                ${character.race ? `<div class="info-item"><span class="info-label">Raza:</span><span class="info-value race-tag">${character.race}</span></div>` : ''}
                ${character.gender ? `<div class="info-item"><span class="info-label">Género:</span><span class="info-value gender-tag">${character.gender}</span></div>` : ''}
            </div>
        </div>
    `;
}

// Cargar todos los personajes al inicio
async function loadAllCharacters() {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error-message');
    
    try {
        loading.style.display = 'block';
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        allCharacters = data.items || data.results || data;
        
    } catch (err) {
        error.style.display = 'block';
        document.getElementById('error-text').textContent = err.message;
        
    } finally {
        loading.style.display = 'none';
    }
}

// Filtrar y mostrar personajes
function filterAndShowCharacters(searchTerm) {
    const container = document.getElementById('characters-container');
    const noResults = document.getElementById('no-results');
    
    // Si no hay término de búsqueda, no mostrar nada
    if (!searchTerm.trim()) {
        container.style.display = 'none';
        noResults.style.display = 'none';
        return;
    }
    
    // Filtrar personajes
    const filteredCharacters = allCharacters.filter(character => 
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Mostrar resultados
    if (filteredCharacters.length === 0) {
        container.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        container.innerHTML = filteredCharacters.map(character => createCharacterCard(character)).join('');
        container.style.display = 'block';
        noResults.style.display = 'none';
    }
}

// Función de búsqueda con debounce
function handleSearch() {
    const searchTerm = document.getElementById('search-input').value;
    
    // Limpiar timeout anterior
    clearTimeout(searchTimeout);
    
    // Ejecutar búsqueda después de 300ms sin escribir
    searchTimeout = setTimeout(() => {
        filterAndShowCharacters(searchTerm);
    }, 300);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('search-input');
    
    // Cargar todos los personajes
    await loadAllCharacters();
    
    // Agregar evento de búsqueda en tiempo real
    searchInput.addEventListener('input', handleSearch);
    
    // También mantener el Enter para búsqueda inmediata
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            clearTimeout(searchTimeout);
            filterAndShowCharacters(searchInput.value);
        }
    });
});
