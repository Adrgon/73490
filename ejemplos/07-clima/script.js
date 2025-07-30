// Configuración de la aplicación
const CONFIG = {
    API_KEY: '0ca063b746578ffb14d9f9455bdb165a',
    API_BASE_URL: 'https://api.openweathermap.org/data/2.5',
    ICON_BASE_URL: 'https://openweathermap.org/img/wn'
};

// Elementos del DOM
const elements = {
    form: document.getElementById('weatherForm'),
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    loading: document.getElementById('loading'),
    weatherResult: document.getElementById('weatherResult'),
    errorMessage: document.getElementById('errorMessage'),
    retryBtn: document.getElementById('retryBtn'),
    
    // Elementos de datos del clima
    cityName: document.getElementById('cityName'),
    countryFlag: document.getElementById('countryFlag'),
    temperature: document.getElementById('temperature'),
    feelsLike: document.getElementById('feelsLike'),
    weatherIcon: document.getElementById('weatherIcon'),
    weatherDescription: document.getElementById('weatherDescription'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    pressure: document.getElementById('pressure'),
    visibility: document.getElementById('visibility'),
    sunrise: document.getElementById('sunrise'),
    sunset: document.getElementById('sunset'),
    errorText: document.getElementById('errorText')
};

// Mapeo de países a banderas (emojis)
const countryFlags = {
    'AD': '🇦🇩', 'AE': '🇦🇪', 'AF': '🇦🇫', 'AG': '🇦🇬', 'AI': '🇦🇮', 'AL': '🇦🇱', 'AM': '🇦🇲',
    'AO': '🇦🇴', 'AQ': '🇦🇶', 'AR': '🇦🇷', 'AS': '🇦🇸', 'AT': '🇦🇹', 'AU': '🇦🇺', 'AW': '🇦🇼',
    'AX': '🇦🇽', 'AZ': '🇦🇿', 'BA': '🇧🇦', 'BB': '🇧🇧', 'BD': '🇧🇩', 'BE': '🇧🇪', 'BF': '🇧🇫',
    'BG': '🇧🇬', 'BH': '🇧🇭', 'BI': '🇧🇮', 'BJ': '🇧🇯', 'BL': '🇧🇱', 'BM': '🇧🇲', 'BN': '🇧🇳',
    'BO': '🇧🇴', 'BQ': '🇧🇶', 'BR': '🇧🇷', 'BS': '🇧🇸', 'BT': '🇧🇹', 'BV': '🇧🇻', 'BW': '🇧🇼',
    'BY': '🇧🇾', 'BZ': '🇧🇿', 'CA': '🇨🇦', 'CC': '🇨🇨', 'CD': '🇨🇩', 'CF': '🇨🇫', 'CG': '🇨🇬',
    'CH': '🇨🇭', 'CI': '🇨🇮', 'CK': '🇨🇰', 'CL': '🇨🇱', 'CM': '🇨🇲', 'CN': '🇨🇳', 'CO': '🇨🇴',
    'CR': '🇨🇷', 'CU': '🇨🇺', 'CV': '🇨🇻', 'CW': '🇨🇼', 'CX': '🇨🇽', 'CY': '🇨🇾', 'CZ': '🇨🇿',
    'DE': '🇩🇪', 'DJ': '🇩🇯', 'DK': '🇩🇰', 'DM': '🇩🇲', 'DO': '🇩🇴', 'DZ': '🇩🇿', 'EC': '🇪🇨',
    'EE': '🇪🇪', 'EG': '🇪🇬', 'EH': '🇪🇭', 'ER': '🇪🇷', 'ES': '🇪🇸', 'ET': '🇪🇹', 'FI': '🇫🇮',
    'FJ': '🇫🇯', 'FK': '🇫🇰', 'FM': '🇫🇲', 'FO': '🇫🇴', 'FR': '🇫🇷', 'GA': '🇬🇦', 'GB': '🇬🇧',
    'GD': '🇬🇩', 'GE': '🇬🇪', 'GF': '🇬🇫', 'GG': '🇬🇬', 'GH': '🇬🇭', 'GI': '🇬🇮', 'GL': '🇬🇱',
    'GM': '🇬🇲', 'GN': '🇬🇳', 'GP': '🇬🇵', 'GQ': '🇬🇶', 'GR': '🇬🇷', 'GS': '🇬🇸', 'GT': '🇬🇹',
    'GU': '🇬🇺', 'GW': '🇬🇼', 'GY': '🇬🇾', 'HK': '🇭🇰', 'HM': '🇭🇲', 'HN': '🇭🇳', 'HR': '🇭🇷',
    'HT': '🇭🇹', 'HU': '🇭🇺', 'ID': '🇮🇩', 'IE': '🇮🇪', 'IL': '🇮🇱', 'IM': '🇮🇲', 'IN': '🇮🇳',
    'IO': '🇮🇴', 'IQ': '🇮🇶', 'IR': '🇮🇷', 'IS': '🇮🇸', 'IT': '🇮🇹', 'JE': '🇯🇪', 'JM': '🇯🇲',
    'JO': '🇯🇴', 'JP': '🇯🇵', 'KE': '🇰🇪', 'KG': '🇰🇬', 'KH': '🇰🇭', 'KI': '🇰🇮', 'KM': '🇰🇲',
    'KN': '🇰🇳', 'KP': '🇰🇵', 'KR': '🇰🇷', 'KW': '🇰🇼', 'KY': '🇰🇾', 'KZ': '🇰🇿', 'LA': '🇱🇦',
    'LB': '🇱🇧', 'LC': '🇱🇨', 'LI': '🇱🇮', 'LK': '🇱🇰', 'LR': '🇱🇷', 'LS': '🇱🇸', 'LT': '🇱🇹',
    'LU': '🇱🇺', 'LV': '🇱🇻', 'LY': '🇱🇾', 'MA': '🇲🇦', 'MC': '🇲🇨', 'MD': '🇲🇩', 'ME': '🇲🇪',
    'MF': '🇲🇫', 'MG': '🇲🇬', 'MH': '🇲🇭', 'MK': '🇲🇰', 'ML': '🇲🇱', 'MM': '🇲🇲', 'MN': '🇲🇳',
    'MO': '🇲🇴', 'MP': '🇲🇵', 'MQ': '🇲🇶', 'MR': '🇲🇷', 'MS': '🇲🇸', 'MT': '🇲🇹', 'MU': '🇲🇺',
    'MV': '🇲🇻', 'MW': '🇲🇼', 'MX': '🇲🇽', 'MY': '🇲🇾', 'MZ': '🇲🇿', 'NA': '🇳🇦', 'NC': '🇳🇨',
    'NE': '🇳🇪', 'NF': '🇳🇫', 'NG': '🇳🇬', 'NI': '🇳🇮', 'NL': '🇳🇱', 'NO': '🇳🇴', 'NP': '🇳🇵',
    'NR': '🇳🇷', 'NU': '🇳🇺', 'NZ': '🇳🇿', 'OM': '🇴🇲', 'PA': '🇵🇦', 'PE': '🇵🇪', 'PF': '🇵🇫',
    'PG': '🇵🇬', 'PH': '🇵🇭', 'PK': '🇵🇰', 'PL': '🇵🇱', 'PM': '🇵🇲', 'PN': '🇵🇳', 'PR': '🇵🇷',
    'PS': '🇵🇸', 'PT': '🇵🇹', 'PW': '🇵🇼', 'PY': '🇵🇾', 'QA': '🇶🇦', 'RE': '🇷🇪', 'RO': '🇷🇴',
    'RS': '🇷🇸', 'RU': '🇷🇺', 'RW': '🇷🇼', 'SA': '🇸🇦', 'SB': '🇸🇧', 'SC': '🇸🇨', 'SD': '🇸🇩',
    'SE': '🇸🇪', 'SG': '🇸🇬', 'SH': '🇸🇭', 'SI': '🇸🇮', 'SJ': '🇸🇯', 'SK': '🇸🇰', 'SL': '🇸🇱',
    'SM': '🇸🇲', 'SN': '🇸🇳', 'SO': '🇸🇴', 'SR': '🇸🇷', 'SS': '🇸🇸', 'ST': '🇸🇹', 'SV': '🇸🇻',
    'SX': '🇸🇽', 'SY': '🇸🇾', 'SZ': '🇸🇿', 'TC': '🇹🇨', 'TD': '🇹🇩', 'TF': '🇹🇫', 'TG': '🇹🇬',
    'TH': '🇹🇭', 'TJ': '🇹🇯', 'TK': '🇹🇰', 'TL': '🇹🇱', 'TM': '🇹🇲', 'TN': '🇹🇳', 'TO': '🇹🇴',
    'TR': '🇹🇷', 'TT': '🇹🇹', 'TV': '🇹🇻', 'TW': '🇹🇼', 'TZ': '🇹🇿', 'UA': '🇺🇦', 'UG': '🇺🇬',
    'UM': '🇺🇲', 'US': '🇺🇸', 'UY': '🇺🇾', 'UZ': '🇺🇿', 'VA': '🇻🇦', 'VC': '🇻🇨', 'VE': '🇻🇪',
    'VG': '🇻🇬', 'VI': '🇻🇮', 'VN': '🇻🇳', 'VU': '🇻🇺', 'WF': '🇼🇫', 'WS': '🇼🇸', 'YE': '🇾🇪',
    'YT': '🇾🇹', 'ZA': '🇿🇦', 'ZM': '🇿🇲', 'ZW': '🇿🇼'
};

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌤️ Clima App iniciada');
    setupEventListeners();
    
    // Enfocar el input al cargar la página
    elements.cityInput.focus();
});

// Configurar event listeners
function setupEventListeners() {
    // Formulario de búsqueda
    elements.form.addEventListener('submit', handleSearch);
    
    // Botón de reintentar
    elements.retryBtn.addEventListener('click', () => {
        hideError();
        elements.cityInput.focus();
    });
    
    // Enter en el input
    elements.cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch(e);
        }
    });
}

// Manejar la búsqueda del clima
async function handleSearch(e) {
    e.preventDefault();
    
    const city = elements.cityInput.value.trim();
    
    if (!city) {
        showError('Por favor, ingresa el nombre de una ciudad');
        return;
    }
    
    try {
        showLoading();
        hideError();
        hideWeatherResult();
        
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
        
    } catch (error) {
        console.error('Error al obtener el clima:', error);
        showError(error.message || 'Error al obtener los datos del clima');
    } finally {
        hideLoading();
    }
}

// Obtener datos del clima desde la API
async function fetchWeatherData(city) {
    const url = `${CONFIG.API_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${CONFIG.API_KEY}&units=metric&lang=es`;
    
    console.log('🌐 Consultando API:', url.replace(CONFIG.API_KEY, '[API_KEY]'));
    
    const response = await fetch(url);
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        switch (response.status) {
            case 404:
                throw new Error(`No se encontró información para "${city}". Verifica el nombre de la ciudad.`);
            case 401:
                throw new Error('Error de autorización. Clave de API inválida.');
            case 429:
                throw new Error('Límite de consultas excedido. Intenta más tarde.');
            case 500:
                throw new Error('Error del servidor. Intenta más tarde.');
            default:
                throw new Error(errorData.message || `Error ${response.status}: No se pudo obtener el clima`);
        }
    }
    
    const data = await response.json();
    console.log('✅ Datos recibidos:', data);
    
    return data;
}

// Mostrar los datos del clima en la interfaz
function displayWeatherData(data) {
    try {
        // Información básica
        elements.cityName.textContent = `${data.name}`;
        elements.countryFlag.textContent = getCountryFlag(data.sys.country);
        
        // Temperatura
        elements.temperature.textContent = Math.round(data.main.temp);
        elements.feelsLike.textContent = Math.round(data.main.feels_like);
        
        // Icono y descripción del clima
        const iconCode = data.weather[0].icon;
        elements.weatherIcon.src = `${CONFIG.ICON_BASE_URL}/${iconCode}@2x.png`;
        elements.weatherIcon.alt = data.weather[0].description;
        elements.weatherDescription.textContent = data.weather[0].description;
        
        // Detalles del clima
        elements.humidity.textContent = `${data.main.humidity}%`;
        elements.windSpeed.textContent = `${data.wind.speed} m/s`;
        elements.pressure.textContent = `${data.main.pressure} hPa`;
        elements.visibility.textContent = data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : 'N/A';
        
        // Horas de amanecer y atardecer
        elements.sunrise.textContent = formatTime(data.sys.sunrise, data.timezone);
        elements.sunset.textContent = formatTime(data.sys.sunset, data.timezone);
        
        // Aplicar tema visual según el clima
        applyWeatherTheme(data.weather[0].main);
        
        showWeatherResult();
        
    } catch (error) {
        console.error('Error al mostrar los datos:', error);
        showError('Error al mostrar los datos del clima');
    }
}

// Obtener la bandera del país
function getCountryFlag(countryCode) {
    return countryFlags[countryCode] || '🌍';
}

// Formatear hora Unix a hora local
function formatTime(timestamp, timezone) {
    try {
        const date = new Date((timestamp + timezone) * 1000);
        return date.toUTCString().slice(-12, -7);
    } catch (error) {
        console.error('Error al formatear hora:', error);
        return 'N/A';
    }
}

// Aplicar tema visual según el tipo de clima
function applyWeatherTheme(weatherMain) {
    // Remover clases de tema previas
    elements.weatherResult.classList.remove('sunny', 'cloudy', 'rainy', 'snowy', 'stormy');
    
    // Aplicar nueva clase según el clima
    switch (weatherMain.toLowerCase()) {
        case 'clear':
            elements.weatherResult.classList.add('sunny');
            break;
        case 'clouds':
            elements.weatherResult.classList.add('cloudy');
            break;
        case 'rain':
        case 'drizzle':
            elements.weatherResult.classList.add('rainy');
            break;
        case 'snow':
            elements.weatherResult.classList.add('snowy');
            break;
        case 'thunderstorm':
            elements.weatherResult.classList.add('stormy');
            break;
        default:
            // Tema por defecto
            break;
    }
}

// Funciones de UI
function showLoading() {
    elements.loading.classList.remove('hidden');
    elements.searchBtn.disabled = true;
    elements.searchBtn.textContent = '⏳ Buscando...';
}

function hideLoading() {
    elements.loading.classList.add('hidden');
    elements.searchBtn.disabled = false;
    elements.searchBtn.textContent = '🔍 Buscar';
}

function showWeatherResult() {
    elements.weatherResult.classList.remove('hidden');
}

function hideWeatherResult() {
    elements.weatherResult.classList.add('hidden');
}

function showError(message) {
    elements.errorText.textContent = message;
    elements.errorMessage.classList.remove('hidden');
}

function hideError() {
    elements.errorMessage.classList.add('hidden');
}

// Manejo de errores globales
window.addEventListener('error', (e) => {
    console.error('Error global:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rechazada:', e.reason);
    showError('Error inesperado. Por favor, intenta de nuevo.');
});

// Log de inicio
console.log('🌤️ Clima App Script Cargado - Versión 1.0');
