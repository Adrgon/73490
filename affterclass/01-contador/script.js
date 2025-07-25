//alert()

const counterValueElement = document.getElementById("counter-value");
console.log(counterValueElement);
const decreaseBtn = document.getElementById("decrease-btn");
console.log(decreaseBtn);
const increaseBtn = document.querySelector("#increase-btn");
console.log(increaseBtn);
const resetBtn = document.querySelector("#reset-btn");
console.log(resetBtn);


let count;


 function updateCounter(num) {
    if(!count){
        count = 0;
    }
    counterValueElement.textContent = num;
 }

decreaseBtn.addEventListener("click", ()=>{
    //count = count - 1;
    count -=1;
    updateCounter(count);
    //count--;
})

increaseBtn.addEventListener('click', ()=>{
    count += 1;
    updateCounter(count);
})

resetBtn.addEventListener('click', ()=>{
    count = 0;
    updateCounter(count);
})

updateCounter(0)
