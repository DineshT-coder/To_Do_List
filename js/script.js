document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        saveTask();
    }
});

document.getElementById('saveButton').addEventListener('click', saveTask);

function saveTask() {
    const input = document.getElementById('taskInput');
    const taskValue = input.value.trim(); 
    const errorMessage = document.getElementById('errorMessage');

    if (taskValue) {
       
        errorMessage.classList.add('hidden');

        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskValue}</span>
            <div>
                <button onclick="markComplete(this)">✔</button>
                <button onclick="deleteTask(this)">✖</button>
            </div>
        `;
        taskList.appendChild(li);
        updateNumbers();

        input.value = '';
    } else {
       
        errorMessage.classList.remove('hidden');
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
    updateNumbers();
}

function markComplete(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.classList.toggle('completed');
}

function updateNumbers() {
    const taskList = document.getElementById('taskList');
    const tasks = taskList.children;

    Array.from(tasks).forEach((task, index) => {
        const span = task.querySelector('span');
        const taskText = span.textContent.split('. ')[1] || span.textContent; // Avoid undefined issue
        span.textContent = `${index + 1}. ${taskText}`;
    });
}
