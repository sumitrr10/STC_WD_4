document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("addBtn").addEventListener("click", addTask);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskTime = document.getElementById('taskTime');
  const taskText = taskInput.value.trim();
  const taskDateTime = taskTime.value;

  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    time: taskDateTime,
    completed: false // new property
  };

  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTask(task);

  taskInput.value = '';
  taskTime.value = '';
}

function renderTask(task) {
  const taskList = document.getElementById('taskList');

  const taskElement = document.createElement('div');
  taskElement.className = 'task-item';
  taskElement.setAttribute('data-id', task.id);
  if (task.completed) taskElement.classList.add('completed');

  taskElement.innerHTML = `
    <div class="task-info">
      <span class="task-title">${task.text}</span>
      <span class="task-time">${task.time ? new Date(task.time).toLocaleString() : 'No due time'}</span>
    </div>
    <div class="task-actions">
      <button class="complete-btn">${task.completed ? '✅' : '✔️'}</button>
      <button class="delete-btn">🗑️</button>
    </div>
  `;

  // Handle delete
  taskElement.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

  // Handle complete
  taskElement.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(task.id));

  taskList.appendChild(taskElement);
}

function deleteTask(id) {
  let tasks = getTasks().filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  const taskElement = document.querySelector(`.task-item[data-id='${id}']`);
  if (taskElement) taskElement.remove();
}

function toggleComplete(id) {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTasks();
  }
}

function loadTasks() {
  refreshTasks();
}

function refreshTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear current list
  const tasks = getTasks();

  // Optional: sort so completed tasks appear at bottom
  tasks.sort((a, b) => a.completed - b.completed);

  tasks.forEach(renderTask);
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

