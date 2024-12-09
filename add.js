// Function to navigate back to the task list page
function goBack() {
    // Redirects the user to the task list page
    window.location.href = 'Task_list.html';
}

// Function to save a new task
function saveTask() {
    // Get values from the form fields
    let title = document.getElementById('task-title').value; // Task title
    let description = document.getElementById('task-desc').value; // Task description
    let dueDate = document.getElementById('due-date').value; // Due date for the task
    let category = document.getElementById('category').value; // Task category
    let priority = document.getElementById('priority').value; // Task priority (Low, Medium, High)

    // Check if all fields are filled out
    if (title && description && dueDate && category && priority) {
        // Send a POST request to the server to save the task
        fetch('http://localhost:5000/tasks', {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify data format as JSON
            },
            body: JSON.stringify({
                title: title,
                description: description,
                due_date: dueDate,
                category: category,
                priority: priority,
                status: 'pending' // Default task status
            })
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // Show success message and go back to the task list
            alert('Task saved successfully!');
            window.location.href = 'Task_list.html';
        })
        .catch(error => console.error('Error adding task:', error)); // Handle errors
    } else {
        // Show an alert if any field is empty
        alert('Please fill out all fields.');
    }
}
