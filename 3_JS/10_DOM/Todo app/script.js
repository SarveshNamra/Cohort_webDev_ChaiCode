const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');

const todoItem = document.getElementById('todo-item');

addBtn.addEventListener('click', () => {
    const value = todoInput.value;
    const li = document.createElement('li');
    li.innerText = value;

    const delButton = document.createElement('button');
    delButton.innerText = 'X';

    delButton.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(delButton);
    todoItem.appendChild(li);
    todoInput.value = '';
});
