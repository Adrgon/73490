// Configuración de la aplicación
const CONFIG = {
    API_BASE_URL: 'https://pokeapi.co/api/v2',
    POKEMON_PER_PAGE: 20,
    MAX_POKEMON: 1010 // Aproximadamente todos los Pokémon disponibles
};

// Estado de la aplicación
let appState = {
    currentOffset: 0,
    isLoading: false,
    allPokemon: [],
    filteredPokemon: [],
    pokemonTypes: [],
    isSearching: false,
    searchTerm: '',
    selectedType: ''
};

// Elementos del DOM
const elements = {
    pokemonContainer: document.getElementById('pokemonContainer'),
    loadingIndicator: document.getElementById('loadingIndicator'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    typeFilter: document.getElementById('typeFilter'),
    resetBtn: document.getElementById('resetBtn'),
    modal: document.getElementById('pokemonModal'),
    modalContent: document.getElementById('modalContent'),
    closeModal: document.querySelector('.close')
};

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Iniciando Pokédex...');
    
    await initializeApp();
    setupEventListeners();
    setupInfiniteScroll();
    
    console.log('✅ Pokédex lista!');
});

// Inicializar la aplicación
async function initializeApp() {
    try {
        showLoading();
        await loadPokemonTypes();
        await loadInitialPokemon();
        hideLoading();
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        showError('Error al cargar la Pokédex. Por favor, recarga la página.');
        hideLoading();
    }
}

// Cargar tipos de Pokémon para el filtro
async function loadPokemonTypes() {
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/type`);
        const data = await response.json();
        
        appState.pokemonTypes = data.results;
        populateTypeFilter();
    } catch (error) {
        console.error('Error al cargar tipos:', error);
    }
}

// Poblar el select de tipos
function populateTypeFilter() {
    const typeFilter = elements.typeFilter;
    
    appState.pokemonTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.name;
        option.textContent = capitalizeFirst(type.name);
        typeFilter.appendChild(option);
    });
}

// Cargar Pokémon inicial
async function loadInitialPokemon() {
    await loadMorePokemon();
}

// Cargar más Pokémon
async function loadMorePokemon() {
    if (appState.isLoading || appState.isSearching) return;
    
    if (appState.currentOffset >= CONFIG.MAX_POKEMON) {
        console.log('📋 Todos los Pokémon cargados');
        return;
    }
    
    appState.isLoading = true;
    showLoading();
    
    try {
        const response = await fetch(
            `${CONFIG.API_BASE_URL}/pokemon?limit=${CONFIG.POKEMON_PER_PAGE}&offset=${appState.currentOffset}`
        );
        const data = await response.json();
        
        // Cargar detalles de cada Pokémon
        const pokemonDetails = await Promise.all(
            data.results.map(pokemon => fetchPokemonDetails(pokemon.url))
        );
        
        // Filtrar Pokémon válidos
        const validPokemon = pokemonDetails.filter(pokemon => pokemon !== null);
        
        appState.allPokemon.push(...validPokemon);
        appState.filteredPokemon = [...appState.allPokemon];
        
        renderPokemon(validPokemon);
        
        appState.currentOffset += CONFIG.POKEMON_PER_PAGE;
        
    } catch (error) {
        console.error('Error al cargar Pokémon:', error);
        showError('Error al cargar más Pokémon');
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
function renderPokemon(pokemonList, append = true) {
    if (!append) {
        elements.pokemonContainer.innerHTML = '';
    }
    
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
    
    // Agregar evento click para mostrar detalles
    card.addEventListener('click', () => showPokemonDetails(pokemon));
    
    return card;
}

// Mostrar detalles del Pokémon en modal
async function showPokemonDetails(pokemon) {
    try {
        // Obtener información adicional de especies
        const speciesResponse = await fetch(`${CONFIG.API_BASE_URL}/pokemon-species/${pokemon.id}`);
        const speciesData = await speciesResponse.json();
        
        const description = getEnglishDescription(speciesData.flavor_text_entries);
        
        const typeBadges = pokemon.types.map(type => 
            `<span class="type-badge type-${type}">${type}</span>`
        ).join('');
        
        const statBars = pokemon.stats.map(stat => `
            <div class="stat-row">
                <span class="stat-name">${capitalizeFirst(stat.stat.name.replace('-', ' '))}:</span>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${Math.min(stat.base_stat, 255) / 255 * 100}%"></div>
                </div>
                <span class="stat-value">${stat.base_stat}</span>
            </div>
        `).join('');
        
        const abilities = pokemon.abilities.map(ability => 
            `<span class="ability-badge">${capitalizeFirst(ability.replace('-', ' '))}</span>`
        ).join('');
        
        elements.modalContent.innerHTML = `
            <div class="modal-pokemon-details">
                <div class="modal-header">
                    <div class="modal-pokemon-image">
                        <img src="${pokemon.image}" alt="${pokemon.name}">
                    </div>
                    <div class="modal-pokemon-info">
                        <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
                        <h2 class="pokemon-name">${capitalizeFirst(pokemon.name)}</h2>
                        <div class="pokemon-types">${typeBadges}</div>
                        <div class="pokemon-physical">
                            <span><strong>Altura:</strong> ${pokemon.height / 10}m</span>
                            <span><strong>Peso:</strong> ${pokemon.weight / 10}kg</span>
                        </div>
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>Descripción</h3>
                    <p>${description}</p>
                </div>
                
                <div class="modal-section">
                    <h3>Habilidades</h3>
                    <div class="abilities-list">${abilities}</div>
                </div>
                
                <div class="modal-section">
                    <h3>Estadísticas Base</h3>
                    <div class="stats-container">
                        ${statBars}
                    </div>
                </div>
            </div>
            
            <style>
                .modal-pokemon-details {
                    font-family: inherit;
                }
                
                .modal-header {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 2rem;
                    align-items: center;
                }
                
                .modal-pokemon-image img {
                    width: 150px;
                    height: 150px;
                    object-fit: contain;
                }
                
                .modal-pokemon-info h2 {
                    font-size: 2rem;
                    margin: 0.5rem 0;
                }
                
                .pokemon-physical {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                    font-size: 0.9rem;
                }
                
                .modal-section {
                    margin-bottom: 2rem;
                }
                
                .modal-section h3 {
                    color: var(--primary-color);
                    border-bottom: 2px solid var(--border-color);
                    padding-bottom: 0.5rem;
                    margin-bottom: 1rem;
                }
                
                .abilities-list {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }
                
                .ability-badge {
                    background: var(--accent-color);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                
                .stat-row {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 0.75rem;
                }
                
                .stat-name {
                    min-width: 120px;
                    font-weight: 600;
                    font-size: 0.9rem;
                }
                
                .stat-bar {
                    flex: 1;
                    height: 8px;
                    background: var(--border-color);
                    border-radius: 4px;
                    overflow: hidden;
                }
                
                .stat-fill {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
                    transition: width 0.3s ease;
                }
                
                .stat-value {
                    min-width: 40px;
                    text-align: right;
                    font-weight: 600;
                    color: var(--primary-color);
                }
                
                @media (max-width: 600px) {
                    .modal-header {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .pokemon-physical {
                        justify-content: center;
                    }
                    
                    .stat-name {
                        min-width: 100px;
                        font-size: 0.8rem;
                    }
                }
            </style>
        `;
        
        elements.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
    } catch (error) {
        console.error('Error al cargar detalles:', error);
        showError('Error al cargar los detalles del Pokémon');
    }
}

// Obtener descripción en inglés (o la primera disponible)
function getEnglishDescription(flavorTexts) {
    const englishEntry = flavorTexts.find(entry => entry.language.name === 'en');
    const spanishEntry = flavorTexts.find(entry => entry.language.name === 'es');
    
    if (spanishEntry) {
        return spanishEntry.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ');
    } else if (englishEntry) {
        return englishEntry.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ');
    } else if (flavorTexts.length > 0) {
        return flavorTexts[0].flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ');
    }
    
    return 'No hay descripción disponible.';
}

// Configurar event listeners
function setupEventListeners() {
    // Búsqueda
    elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
    elements.searchBtn.addEventListener('click', () => handleSearch());
    
    // Filtro por tipo
    elements.typeFilter.addEventListener('change', handleTypeFilter);
    
    // Reset
    elements.resetBtn.addEventListener('click', resetFilters);
    
    // Modal
    elements.closeModal.addEventListener('click', closeModal);
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) closeModal();
    });
    
    // Escape key para cerrar modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Manejar búsqueda
function handleSearch() {
    const searchTerm = elements.searchInput.value.trim().toLowerCase();
    appState.searchTerm = searchTerm;
    appState.isSearching = searchTerm !== '';
    
    filterAndRenderPokemon();
}

// Manejar filtro por tipo
function handleTypeFilter() {
    appState.selectedType = elements.typeFilter.value;
    filterAndRenderPokemon();
}

// Filtrar y renderizar Pokémon
function filterAndRenderPokemon() {
    let filtered = [...appState.allPokemon];
    
    // Filtrar por búsqueda
    if (appState.searchTerm) {
        filtered = filtered.filter(pokemon => 
            pokemon.name.toLowerCase().includes(appState.searchTerm) ||
            pokemon.id.toString().includes(appState.searchTerm)
        );
    }
    
    // Filtrar por tipo
    if (appState.selectedType) {
        filtered = filtered.filter(pokemon => 
            pokemon.types.includes(appState.selectedType)
        );
    }
    
    appState.filteredPokemon = filtered;
    renderPokemon(filtered, false);
    
    // Mostrar mensaje si no hay resultados
    if (filtered.length === 0) {
        showEmptyState();
    }
}

// Resetear filtros
function resetFilters() {
    elements.searchInput.value = '';
    elements.typeFilter.value = '';
    appState.searchTerm = '';
    appState.selectedType = '';
    appState.isSearching = false;
    
    appState.filteredPokemon = [...appState.allPokemon];
    renderPokemon(appState.allPokemon, false);
}

// Configurar scroll infinito
function setupInfiniteScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !appState.isLoading && !appState.isSearching) {
                loadMorePokemon();
            }
        });
    }, {
        rootMargin: '100px'
    });
    
    observer.observe(elements.loadingIndicator);
}

// Cerrar modal
function closeModal() {
    elements.modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Utilidades
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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

function showEmptyState() {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty-state';
    emptyDiv.innerHTML = `
        <h3>🔍 No se encontraron Pokémon</h3>
        <p>Intenta con otro término de búsqueda o cambia los filtros.</p>
    `;
    
    elements.pokemonContainer.innerHTML = '';
    elements.pokemonContainer.appendChild(emptyDiv);
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
