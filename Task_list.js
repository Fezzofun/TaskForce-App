function signOut() {
    window.location.href = 'login.html';
}

function completed() {
    window.location.href = 'Completed.html';
}

function add() {
    window.location.href = 'add.html';
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskContainer = document.getElementById('task-container');
    taskContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        let taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <h3>${task.title}</h3>
            <p>Description: ${task.description}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Category: ${task.category}</p>
            <p>Priority: ${task.priority}</p>
            <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
        `;
        taskContainer.appendChild(taskDiv);
    });
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

window.onload = loadTasks;

document.getElementById('add-task').onclick = function() {
    let taskContainer = document.getElementById('task-container');
    let newTask = document.createElement('div');
    newTask.className = 'task';
    newTask.innerText = 'New Task';
    taskContainer.appendChild(newTask);
};

document.getElementById('sign-out').onclick = function() {
    alert('Signed out');
};

document.getElementById('settings').onclick = function() {
    alert('Settings page');
};

document.getElementById('completed').onclick = function() {
    alert('Completed tasks');
};

