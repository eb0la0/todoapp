const API_BASE = 'http://127.0.0.1:8000/api';

let todos = [];

async function fetchTodos() {
  const response = await fetch(`${API_BASE}/todos`);
  todos = await response.json();
  render();
}

async function createTodo(title, description) {
  const body = { title };
  if (description) body.description = description;
  const response = await fetch(`${API_BASE}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const created = await response.json();
  todos.push(created);
  render();
}

async function toggleTodo(id, completed) {
  const response = await fetch(`${API_BASE}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !completed }),
  });
  const updated = await response.json();
  todos = todos.map((t) => (t.id === id ? updated : t));
  render();
}

async function deleteTodo(id) {
  await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' });
  todos = todos.filter((t) => t.id !== id);
  render();
}

function render() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id, todo.completed));

    const textDiv = document.createElement('div');
    textDiv.className = 'todo-text';
    if (todo.completed) textDiv.classList.add('completed');

    const titleSpan = document.createElement('span');
    titleSpan.className = 'todo-title';
    titleSpan.textContent = todo.title;

    textDiv.appendChild(titleSpan);

    if (todo.description) {
      const descSpan = document.createElement('span');
      descSpan.className = 'todo-description';
      descSpan.textContent = todo.description;
      textDiv.appendChild(descSpan);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(textDiv);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchTodos();

  const form = document.getElementById('todo-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('title-input');
    const descInput = document.getElementById('description-input');
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    if (!title) return;
    await createTodo(title, description);
    titleInput.value = '';
    descInput.value = '';
  });
});
