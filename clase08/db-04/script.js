const API_URL = "https://dragonball-api.com/api/characters";

function createCharacterCard(character) {
  return `
        <div class="character-card">
            <img class="character-image" 
                 src="${
                   character.image ||
                   "https://via.placeholder.com/200x200?text=Sin+Imagen"
                 }" 
                 alt="${character.name}">
            <h3 class="character-name">${character.name}</h3>
            <div class="character-info">
                ${
                  character.race
                    ? `<div class="info-item"><span class="info-label">Raza:</span><span class="info-value race-tag">${character.race}</span></div>`
                    : ""
                }
                ${
                  character.gender
                    ? `<div class="info-item"><span class="info-label">Género:</span><span class="info-value gender-tag">${character.gender}</span></div>`
                    : ""
                }
            </div>
        </div>
    `;
}


// la funcion de busqueda
async function searchCharacters() {
    const serchTerm = document.getElementById('search-input').value.trim().toLowerCase();
   
    if(!serchTerm){
        alert('Por favor ingrese un término de búsqueda');
        return;
    }

    const loading = document.getElementById('loading');
    const error = document.getElementById('error-message');
    const container = document.getElementById('characters-container');

    loading.style.display = 'block';
    error.style.display = 'none';
    container.style.display = 'none';

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const allCharacters = data.items;

      const filteredCharacters = allCharacters.filter((character) =>
        character.name.toLowerCase().includes(serchTerm)
      );

      if (filteredCharacters.length === 0) {
        console.log(
          "No se encontraron personajes con el término de búsqueda: " +
            serchTerm
        );
      } else {
        container.innerHTML = filteredCharacters
          .map((character) => createCharacterCard(character))
          .join("");
        container.style.display = "block";
      }
    } catch (err) {
      error.style.display = "block";
      document.getElementById("error-text").textContent = err.message;
    } finally {
      loading.style.display = "none";
    }
}


document.addEventListener('DOMContentLoaded', ()=> {
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener('keypress', (evt)=> {
        if(evt.key === 'Enter') {
            searchCharacters()
        }
    })
})
