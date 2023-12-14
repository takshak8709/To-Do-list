document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = {
            id: new Date().getTime(),
            text: taskText
        };

        // Get existing tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Add the new task
        tasks.push(task);

        // Save the tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Add the task to the DOM
        addTaskToDOM(task);

        // Clear the input field
        taskInput.value = '';
    }
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');

    listItem.innerHTML = `
        <span>${task.text}</span>
        <span class="delete" onclick="deleteTask(${task.id})">&#10006;</span>
    `;

    taskList.appendChild(listItem);
}

function deleteTask(taskId) {
    // Get existing tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Filter out the task to be deleted
    const updatedTasks = tasks.filter(task => task.id !== taskId);

    // Save the updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Reload the tasks in the DOM
    loadTasks();
}
