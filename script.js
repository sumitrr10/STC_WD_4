// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("addBtn").addEventListener("click", addTask);

// Add task function
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskTime = document.getElementById('taskTime');
  const taskList = document.getElementById('taskList');

  const taskText = taskInput.value.trim();
  const taskDateTime = taskTime.value;

  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    time: taskDateTime
  };

  // Save to local storage
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Render
  renderTask(task);

  // Clear inputs
  taskInput.value = '';
  taskTime.value = '';
}

// Render a single task
function renderTask(task) {
  const taskList = document.getElementById('taskList');

  const taskElement = document.createElement('div');
  taskElement.className = 'task-item';
  taskElement.setAttribute('data-id', task.id);

  taskElement.innerHTML = `
    <div class="task-info">
      <span class="task-title">${task.text}</span>
      <span class="task-time">${task.time ? new Date(task.time).toLocaleString() : 'No due time'}</span>
    </div>
    <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
  `;

  taskList.appendChild(taskElement);
}

// Delete task
function deleteTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  const taskElement = document.querySelector(`.task-item[data-id='${id}']`);
  if (taskElement) taskElement.remove();
}

// Load all tasks
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(renderTask);
}

// Get tasks from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
