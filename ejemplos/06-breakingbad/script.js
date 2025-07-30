// URL de la API de Breaking Bad
const API_URL = 'https://api.breakingbadquotes.xyz/v1/quotes';

// Elementos del DOM
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuote');

// Función para obtener una frase aleatoria
async function getRandomQuote() {
    try {
        // Mostrar loading
        quoteElement.textContent = 'Cargando...';
        authorElement.textContent = '';
        
        // Hacer petición a la API
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Error al obtener la frase');
        }
        
        const data = await response.json();
        
        // La API devuelve un array, tomamos el primer elemento
        const quote = data[0];
        
        // Mostrar la frase y el autor
        quoteElement.textContent = `"${quote.quote}"`;
        authorElement.textContent = `- ${quote.author}`;
        
    } catch (error) {
        console.error('Error:', error);
        quoteElement.textContent = 'Error al cargar la frase. Intenta de nuevo.';
        authorElement.textContent = '';
    }
}

// Event listener para el botón
newQuoteBtn.addEventListener('click', getRandomQuote);

// Cargar una frase al inicio
document.addEventListener('DOMContentLoaded', getRandomQuote);
