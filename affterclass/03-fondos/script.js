//alert()

const changeColorBtn = document.querySelector("#change-color-btn");
const colorDisplay = document.querySelector("#color-display");
const body = document.body;


function getRandomHexColor() {
    let letters = '0123456789ABCDEF'
    let color = '#';
    for(let i=0; i<6; i+=1) {
        color += letters[Math.floor(Math.random() * 16)] 
    }
    return color;
}

changeColorBtn.addEventListener('click', ()=> {
    const newColor = getRandomHexColor() 
    body.style.backgroundColor = newColor;
    colorDisplay.textContent = `Color: ${newColor}`
})
