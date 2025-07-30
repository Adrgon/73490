// Configuración de la aplicación
const CONFIG = {
    API_BASE_URL: 'https://pokeapi.co/api/v2',
    POKEMON_PER_PAGE: 20,
    MAX_POKEMON: 1010 // Aproximadamente todos los Pokémon disponibles
};

// Estado de la aplicación
let appState = {
    currentPage: 1,
    totalPages: Math.ceil(CONFIG.MAX_POKEMON / CONFIG.POKEMON_PER_PAGE),
    isLoading: false
};

// Elementos del DOM
const elements = {
    pokemonContainer: document.getElementById('pokemonContainer'),
    loadingIndicator: document.getElementById('loadingIndicator'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    pageInfo: document.getElementById('pageInfo'),
    totalInfo: document.getElementById('totalInfo')
};

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Iniciando Pokédex...');
    
    await initializeApp();
    setupEventListeners();
    
    console.log('✅ Pokédex lista!');
});

// Inicializar la aplicación
async function initializeApp() {
    try {
        updatePaginationInfo();
        await loadPokemonPage(1);
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        showError('Error al cargar la Pokédex. Por favor, recarga la página.');
    }
}

// Cargar página específica de Pokémon
async function loadPokemonPage(page) {
    if (appState.isLoading) return;
    
    appState.isLoading = true;
    showLoading();
    
    try {
        const offset = (page - 1) * CONFIG.POKEMON_PER_PAGE;
        
        const response = await fetch(
            `${CONFIG.API_BASE_URL}/pokemon?limit=${CONFIG.POKEMON_PER_PAGE}&offset=${offset}`
        );
        const data = await response.json();
        
        // Cargar detalles de cada Pokémon
        const pokemonDetails = await Promise.all(
            data.results.map(pokemon => fetchPokemonDetails(pokemon.url))
        );
        
        // Filtrar Pokémon válidos
        const validPokemon = pokemonDetails.filter(pokemon => pokemon !== null);
        
        renderPokemon(validPokemon);
        
        appState.currentPage = page;
        updatePaginationControls();
        
        // Scroll al top después de cargar
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error al cargar Pokémon:', error);
        showError('Error al cargar Pokémon');
    } finally {
        appState.isLoading = false;
        hideLoading();
    }
}

// Obtener detalles de un Pokémon
async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const pokemon = await response.json();
        
        return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other['official-artwork'].front_default || 
                   pokemon.sprites.front_default ||
                   'https://via.placeholder.com/150?text=No+Image',
            types: pokemon.types.map(type => type.type.name),
            height: pokemon.height,
            weight: pokemon.weight,
            stats: pokemon.stats,
            abilities: pokemon.abilities.map(ability => ability.ability.name)
        };
    } catch (error) {
        console.error(`Error al obtener detalles del Pokémon:`, error);
        return null;
    }
}

// Renderizar Pokémon en el DOM
function renderPokemon(pokemonList) {
    elements.pokemonContainer.innerHTML = '';
    
    pokemonList.forEach(pokemon => {
        const pokemonCard = createPokemonCard(pokemon);
        elements.pokemonContainer.appendChild(pokemonCard);
    });
}

// Crear tarjeta de Pokémon
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.dataset.pokemonId = pokemon.id;
    
    const typeBadges = pokemon.types.map(type => 
        `<span class="type-badge type-${type}">${type}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="pokemon-image">
            <img src="${pokemon.image}" alt="${pokemon.name}" loading="lazy">
        </div>
        <div class="pokemon-info">
            <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
            <h3 class="pokemon-name">${capitalizeFirst(pokemon.name)}</h3>
            <div class="pokemon-types">${typeBadges}</div>
            <div class="pokemon-stats">
                <span>Altura: ${pokemon.height / 10}m</span>
                <span>Peso: ${pokemon.weight / 10}kg</span>
            </div>
        </div>
    `;
    
    return card;
}

// Funciones de paginación
function updatePaginationInfo() {
    elements.totalInfo.textContent = ` de ${appState.totalPages}`;
}

function updatePaginationControls() {
    elements.pageInfo.textContent = `Página ${appState.currentPage}`;
    
    // Actualizar estado de botones
    elements.prevBtn.disabled = appState.currentPage <= 1;
    elements.nextBtn.disabled = appState.currentPage >= appState.totalPages;
}

function goToPreviousPage() {
    if (appState.currentPage > 1) {
        loadPokemonPage(appState.currentPage - 1);
    }
}

function goToNextPage() {
    if (appState.currentPage < appState.totalPages) {
        loadPokemonPage(appState.currentPage + 1);
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Paginación
    elements.prevBtn.addEventListener('click', goToPreviousPage);
    elements.nextBtn.addEventListener('click', goToNextPage);
}

// Utilidades
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showLoading() {
    elements.loadingIndicator.classList.add('show');
}

function hideLoading() {
    elements.loadingIndicator.classList.remove('show');
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    elements.pokemonContainer.innerHTML = '';
    elements.pokemonContainer.appendChild(errorDiv);
}

// Manejo de errores global
window.addEventListener('error', (e) => {
    console.error('Error global:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rechazada:', e.reason);
});

// Log de inicio
console.log('📱 Pokédex Script Cargado - Versión 1.0');
