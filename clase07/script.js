//alert()
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById('nextBtn');
//console.log(document.getElementById("prevBtn"));
//console.log(prveBtn);
//prevBtn.textContent = "Previous";
//nextBtn.innerText = "Next";
const carouselImagesContainer = document.querySelector(".carousel-images");
//console.log(caruselImagesContainer)
let carouselImages = document.querySelectorAll(".carousel-img");


let currentIndex = 0;
let totalImages = carouselImages.length;


function showImage(index){
    if(totalImages === 0) {
        console.log("No hay imagenes en el corrusel")
        return;
    }

    carouselImages.forEach((img, i)=> {
        if(i === index) {
            img.classList.add('active')
        } else {
            img.classList.remove('active')
        }
    })
}

/* nextBtn.onclick = (evt)=>{
if(totalImages === 0 ) {
        return;
    }
    if(currentIndex === totalImages-1){
        currentIndex = 0
    }else {
        currentIndex += 1;
    }
    //currentIndex = (currentIndex + 1) % totalImages;
    console.log(currentIndex)
    showImage(currentIndex)

} */

//showImage(3);
nextBtn.addEventListener('click', (evt)=>{
    //console.log(evt)
      if (totalImages === 0) {
        return;
      }
      if (currentIndex === totalImages - 1) {
        currentIndex = 0;
      } else {
        currentIndex += 1;
      }
      //currentIndex = (currentIndex + 1) % totalImages;
      console.log(currentIndex);
      showImage(currentIndex);
    
})

prevBtn.addEventListener("click",(evt)=>{
    //console.log(evt)
    if(totalImages === 0) return;
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(currentIndex);
})

prevBtn.addEventListener('mouseenter', ()=>{
    prevBtn.style.transform = "translateY(-50%) scale(1.1)";
    //prevBtn.style.display = "none";
})


prevBtn.addEventListener("mouseleave", () => {
  prevBtn.style.transform = "translateY(-50%) scale(1)";
  //prevBtn.style.display = "block";
});

nextBtn.addEventListener("mouseenter", () => {
  nextBtn.style.transform = "translateY(-50%) scale(1.1)";

});

nextBtn.addEventListener("mouseleave", () => {
  nextBtn.style.transform = "translateY(-50%) scale(1)";
});



// -------------------------------------------

const carouselConfigForm = document.getElementById("carouselConfigForm");
const imageUrlInput = document.getElementById("imageUrl");

const imageIndexToRemoveInput = document.getElementById("imageIndexToRemove");
const removeImageBtn = document.getElementById("removeImageBtn");

function updateCarouselReferences() {
  carouselImages = document.querySelectorAll(".carousel-img"); // Re-seleccionar todas las imágenes
  totalImages = carouselImages.length; // Actualizar el total

  // Ajustar el índice actual si excede el nuevo total o si no hay imágenes
  if (totalImages === 0) {
    currentIndex = 0;
  } else if (currentIndex >= totalImages) {
    currentIndex = totalImages - 1;
  }

  showImage(currentIndex); // Asegurarse de que la imagen correcta se muestre
}




carouselConfigForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const newImageUrl = imageUrlInput.value.trim();
    if (newImageUrl) {
        const newImage = document.createElement('img');
        newImage.alt = `Image agregada ${totalImages + 1}`;
        newImage.src = newImageUrl;
        newImage.classList.add('carousel-img');
        caruselImagesContainer.appendChild(newImage);
        imageUrlInput.value = '';
        updateCarouselReferences();
        currentIndex = totalImages - 1;
        showImage(currentIndex)
        alert("Imagen Agregada")

    }else {
        alert("Ingresa una url de una imagen")
    }
})

removeImageBtn.addEventListener("click", () => {
    //alert()
  const indexToRemove = parseInt(imageIndexToRemoveInput.value);

  if (totalImages === 0) {
    alert("No hay imágenes para eliminar.");
    return;
  }

  if (
    !isNaN(indexToRemove) &&
    indexToRemove >= 0 &&
    indexToRemove < totalImages
  ) {
    const imageToRemove = carouselImages[indexToRemove];
    carouselImagesContainer.removeChild(imageToRemove); // Eliminar la imagen del DOM

    updateCarouselReferences(); // Actualizar las referencias del carrusel
    alert(`Imagen en el índice ${indexToRemove} eliminada.`);
    imageIndexToRemoveInput.value = 0; // Resetear el input del índice
  } else {
    alert(`Por favor, ingresa un índice válido entre 0 y ${totalImages - 1}.`);
  }
});
