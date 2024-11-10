function loadTaskForEditing() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const taskId = urlParams.get('task_id');

  fetch(`http://localhost:5000/tasks/${taskId}`)
      .then(response => response.json())
      .then(task => {
          document.getElementById('title').value = task.title;
          document.getElementById('description').value = task.description;
          document.getElementById('due-date').value = task.due_date;
          document.getElementById('category').value = task.category;
          document.getElementById('priority').value = task.priority;
      })
      .catch(error => {
          alert("Error loading task.");
          console.error('Error fetching task details:', error);
          window.location.href = 'Task_list.html';
      });
}

function saveTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("due-date").value;
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;
  const status = 'pending'; 
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const taskId = urlParams.get('task_id');

  fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          title: title,
          description: description,
          due_date: dueDate,
          category: category,
          priority: priority,
          status: status
      })
  })
  .then(response => response.json())
  .then(data => {
      alert("Task updated successfully!");
      window.location.href = 'Task_list.html';
  })
  .catch(error => {
      alert("Error updating task.");
      console.error('Error updating task:', error);
  });
}

function cancelEdit() {
  if (confirm("Are you sure you want to cancel?")) {
      window.location.href = 'Task_list.html';
  }
}