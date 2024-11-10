function signOut() {
    window.location.href = 'login.html';
}

function completed() {
    window.location.href = 'Completed.html';
}

function add() {
    window.location.href = 'add.html';
}

function openSettings(){
    window.location.href ='setting.html';
}

function loadTasks() {
    fetch('http://localhost:5000/tasks')
        .then(response => response.json())
        .then(tasks => {
            let taskContainer = document.getElementById('task-container');
            taskContainer.innerHTML = '';
            tasks.forEach(task => {
                let taskDiv = document.createElement('div');
                taskDiv.className = 'task';
                taskDiv.innerHTML = `
                    <p><strong>${task.title}</strong></p>
                    <p>Due: ${task.due_date}</p>
                    <div class="button-container">
                        <button class="edit-button" onclick="editTask(${task.task_id})">Edit</button>
                        <button class="delete-button" onclick="deleteTask(${task.task_id})">Delete</button>
                    </div>
                `;
                addSwipeListeners(taskDiv);
                taskContainer.appendChild(taskDiv);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function deleteTask(taskId) {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadTasks(); 
    })
    .catch(error => console.error('Error deleting task:', error));
}

function editTask(taskId) {
    window.location.href = `edit.html?task_id=${taskId}`;
}

function addSwipeListeners(taskElement) {
    let startX;
    let currentX;
    let swiped = false;

    taskElement.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });

    taskElement.addEventListener('touchmove', (event) => {
        currentX = event.touches[0].clientX;
        let difference = currentX - startX;

        if (difference < -50 && !swiped) {
            taskElement.classList.add('swiped');
            swiped = true;
        } else if (difference > 50 && swiped) {
            taskElement.classList.remove('swiped');
            swiped = false;
        }
    });

    taskElement.addEventListener('touchend', () => {
        if (!swiped) {
            taskElement.classList.remove('swiped');
        }
    });
}

window.onload = loadTasks;