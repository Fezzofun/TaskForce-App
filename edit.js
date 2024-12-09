// Function to load the task details for editing
function loadTaskForEditing() {
    // Get the task ID from the URL query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const taskId = urlParams.get('task_id'); // Extract the task_id parameter
  
    // Fetch task details from the server
    fetch(`http://localhost:5000/tasks/${taskId}`)
        .then(response => response.json()) // Parse the server response as JSON
        .then(task => {
            // Populate form fields with the task data
            document.getElementById('title').value = task.title;
            document.getElementById('description').value = task.description;
            document.getElementById('due-date').value = task.due_date;
            document.getElementById('category').value = task.category;
            document.getElementById('priority').value = task.priority;
        })
        .catch(error => {
            // Show error message and redirect if task details fail to load
            alert("Error loading task.");
            console.error('Error fetching task details:', error);
            window.location.href = 'Task_list.html';
        });
  }
  
  // Function to save changes to the task
  function saveTask() {
    // Gather updated task details from the form
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;
    const status = 'pending'; // Default status
  
    // Get the task ID from the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const taskId = urlParams.get('task_id');
  
    // Send updated task details to the server
    fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PUT', // HTTP method for updating a resource
        headers: {
            'Content-Type': 'application/json' // Specify data format as JSON
        },
        body: JSON.stringify({ // Prepare data to send
            title: title,
            description: description,
            due_date: dueDate,
            category: category,
            priority: priority,
            status: status
        })
    })
    .then(response => response.json()) // Parse server response
    .then(data => {
        // Notify user of success and redirect
        alert("Task updated successfully!");
        window.location.href = 'Task_list.html';
    })
    .catch(error => {
        // Notify user of error
        alert("Error updating task.");
        console.error('Error updating task:', error);
    });
  }
  
  // Function to cancel editing
  function cancelEdit() {
    // Confirm with the user before navigating away
    if (confirm("Are you sure you want to cancel?")) {
        window.location.href = 'Task_list.html'; // Redirect to task list
    }
  }
  