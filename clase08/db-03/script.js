const API_URL = "https://dragonball-api.com/api/characters";

function createCharacterCard(character) {
    return `
        <div class="character-card">
            <img class="character-image" 
                 src="${
                   character.image 
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


async function loadCharacters(){
    const loading = document.getElementById("loading");
    const error = document.getElementById("error-message");
    const container = document.querySelector("#characters-container");

    error.style.display = "none";
    container.style.display = "none";
    loading.style.display = "block";

    try{
        const response = await fetch(API_URL)
        if(!response.ok){
            throw new Error("Error " + response.status)
        }
        const data = await response.json()
        //console.log(data.items)
        const characters = data.items
        container.innerHTML = characters
            .map(character => createCharacterCard(character))
            .join("");
            container.style.display = "block";
        } catch (err) {
            error.style.display = "block";
            container.style.display = "none";
            document.getElementById("error-text").textContent = err.message;
        }finally {
            loading.style.display = "none";
        }

}


loadCharacters();
