const toAdd = document.getElementById('addButton');
const totalTasksCount = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');

toAdd.addEventListener('click', function() {
    const taskValue = taskInput.value.trim();

    if (taskValue === '') {
        alert('Please enter a task.');
        return;
    }

    const createLi = document.createElement('li');
    createLi.innerText = taskValue;
    createLi.classList.add('task-item');

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    

    taskList.appendChild(checkBox);
    taskList.appendChild(createLi);

    taskInput.value = '';

    const emptyList = document.querySelector('.empty-list');
    if(emptyList){
        emptyList.remove();
    }
});