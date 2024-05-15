const newTaskInput = document.getElementById('new-task');
const taskCategorySelect = document.getElementById('task-category');
const todoList = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list'); // New element for completed tasks
const addButton = document.getElementById('add-btn');

// Array to store todo items with category and completion information
let todoItems = [];

// Function to add a new task with category
function addTask() {
  const newTaskText = newTaskInput.value.trim();
  const selectedCategory = taskCategorySelect.value;

  if (newTaskText) {
    const newTodoItem = {
      text: newTaskText,
      category: selectedCategory,
      completed: false, // Initial state for tasks
    };
    todoItems.push(newTodoItem);
    renderTodoList();
    newTaskInput.value = ''; // Clear input field
  }
}

// Function to render the to-do list based on current todoItems
function renderTodoList() {
  todoList.innerHTML = ''; // Clear existing list items

  for (const todoItem of todoItems) {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');

    checkbox.type = 'checkbox';
    checkbox.checked = todoItem.completed; // Set checkbox state based on completed property
    label.innerText = `${todoItem.text} - ${todoItem.category}`;

    // Event listener for checkbox change (can be refactored for reusability)
    checkbox.addEventListener('change', function() {
      todoItem.completed = this.checked; // Update completed state in the array
      renderTodoList(); // Re-render the list to reflect the change
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    // Add logic to decide if completed (consider using a separate list or class)
    if (todoItem.completed) {
      completedList.appendChild(listItem);
    } else {
      todoList.appendChild(listItem);
    }
  }
}

// Event listener for adding a new task
addButton.addEventListener('click', addTask);

// Call renderTodoList initially to display existing tasks (if any)
renderTodoList();
