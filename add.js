function goBack() {
    window.location.href = 'Task_list.html'
}

function saveTask() {
    let title = document.getElementById('task-title').value;
    let description = document.getElementById('task-desc').value;
    let dueDate = document.getElementById('due-date').value;
    let category = document.getElementById('category').value;
    let priority = document.getElementById('priority').value;

    if (title && description && dueDate && category && priority) {
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                due_date: dueDate,
                category: category,
                priority: priority,
                status: 'pending'
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Task saved successfully!');
            window.location.href = 'Task_list.html';
        })
        .catch(error => console.error('Error adding task:', error));
    } else {
        alert('Please fill out all fields.');
    }
}