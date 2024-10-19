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
        let task = {
            title: title,
            description: description,
            dueDate: dueDate,
            category: category,
            priority: priority
        };

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        alert('Task saved successfully!');
        window.location.href = 'Task_list.html';
    } else {
        alert('Please fill out all fields.');
    }
}
