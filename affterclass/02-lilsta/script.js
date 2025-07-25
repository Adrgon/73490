const todoForm = document.querySelector("#todo-form");
console.log(todoForm);
const todoInput = document.querySelector("#todo-input");
console.log(todoInput);
const todoList = document.querySelector("#todo-list");
console.log(todoList);

todoForm.addEventListener('submit', (evt)=>{
    console.log("Form submitted");
    evt.preventDefault();

    const todoText = todoInput.value.trim();
    if(todoText !== ''){
        addTodoItem(todoText);
        todoInput.value = '';
    }
})

function addTodoItem(text){
    
    const listItem = document.createElement('li');
     listItem.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Eliminar</button>
    `; 
        



    todoList.appendChild(listItem)

}

todoList.addEventListener('click', (evt)=>{
    console.log(evt.target)
    if(evt.target.classList.contains('delete-btn')) {
        evt.target.parentElement.remove();
    }
})
