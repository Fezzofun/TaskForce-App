// Function to sign out and redirect the user to the login page
function signOut() {
    window.location.href = 'login.html'; // Redirect to login page
}

// Function to navigate to the completed tasks page
function completed() {
    window.location.href = 'Completed.html'; // Redirect to the completed tasks page
}

// Function to navigate to the add new task page
function add() {
    window.location.href = 'add.html'; // Redirect to the add task page
}

// Function to navigate to the settings page
function openSettings() {
    window.location.href = 'setting.html'; // Redirect to the settings page
}

// Function to load tasks from the server and display them
function loadTasks() {
    fetch('http://localhost:5000/tasks') // Fetch tasks from the server
        .then(response => response.json()) // Parse the response as JSON
        .then(tasks => {
            let taskContainer = document.getElementById('task-container'); // Get the task container element
            taskContainer.innerHTML = ''; // Clear the current content
            tasks.forEach(task => { // Loop through each task
                let taskDiv = document.createElement('div'); // Create a new div for the task
                taskDiv.className = 'task'; // Add a class for styling
                taskDiv.innerHTML = `
                    <p><strong>${task.title}</strong></p> <!-- Task title -->
                    <p>Due: ${task.due_date}</p> <!-- Task due date -->
                    <div class="button-container">
                        <button class="edit-button" onclick="editTask(${task.task_id})">Edit</button> <!-- Edit button -->
                        <button class="delete-button" onclick="deleteTask(${task.task_id})">Delete</button> <!-- Delete button -->
                    </div>
                `;
                addSwipeListeners(taskDiv); // Add swipe functionality for mobile devices
                taskContainer.appendChild(taskDiv); // Add the task to the container
            });
        })
        .catch(error => console.error('Error fetching tasks:', error)); // Log any errors
}

// Function to delete a task
function deleteTask(taskId) {
    fetch(`http://localhost:5000/tasks/${taskId}`, { // API endpoint for deleting a task
        method: 'DELETE' // Use the DELETE HTTP method
    })
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
        alert(data.message); // Show a message after deletion
        loadTasks(); // Reload the tasks to reflect changes
    })
    .catch(error => console.error('Error deleting task:', error)); // Log any errors
}

// Function to edit a task
function editTask(taskId) {
    window.location.href = `edit.html?task_id=${taskId}`; // Redirect to the edit page with the task ID
}

// Function to add swipe listeners for touch gestures on tasks
function addSwipeListeners(taskElement) {
    let startX; // Starting position of the touch
    let currentX; // Current position of the touch
    let swiped = false; // Flag to check if a swipe has occurred

    // Listen for the start of a touch event
    taskElement.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX; // Get the initial X position
    });

    // Listen for touch movement
    taskElement.addEventListener('touchmove', (event) => {
        currentX = event.touches[0].clientX; // Get the current X position
        let difference = currentX - startX; // Calculate the difference

        if (difference < -50 && !swiped) { // Check for a swipe left
            taskElement.classList.add('swiped'); // Add a swipe class
            swiped = true; // Set the flag
        } else if (difference > 50 && swiped) { // Check for a swipe right
            taskElement.classList.remove('swiped'); // Remove the swipe class
            swiped = false; // Reset the flag
        }
    });

    // Listen for the end of the touch event
    taskElement.addEventListener('touchend', () => {
        if (!swiped) { // If no swipe occurred
            taskElement.classList.remove('swiped'); // Ensure the swipe class is removed
        }
    });
}

// Load tasks when the page is loaded
window.onload = loadTasks; // Call loadTasks on page load