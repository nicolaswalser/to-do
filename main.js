// Get references to the necessary DOM elements
const addButton = document.getElementById("addButton");
const dateInput = document.getElementById("dateInput");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Function to retrieve tasks from local storage
function getTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

// Array to store the tasks
let tasks = getTasksFromLocalStorage();

// Task class to represent a task
class Task {
  constructor(date, description) {
    this.date = date;
    this.description = description;
    this.completed = false;
  }

  // Method to toggle the completion status of a task
  toggleCompletion() {
    this.completed = !this.completed;
  }
}

// Function to create the DOM elements for a task
function createTaskElement(task) {
  const listItem = document.createElement("li");
  const checkbox = createCheckbox(task);
  const descriptionText = createDescription(task);
  const removeButton = createRemoveButton(task, listItem);
  const dateSection = createDateSection(task.date);

  listItem.appendChild(checkbox);
  listItem.appendChild(descriptionText);
  listItem.appendChild(removeButton);
  dateSection.appendChild(listItem);
}

// Function to create the remove button for a task
function createRemoveButton(task, listItem) {
  const removeButton = document.createElement("span");
  removeButton.classList.add("remove");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    handleRemoveButtonClick(task, listItem);
  });

  return removeButton;
}

// Function to create the checkbox for a task
function createCheckbox(task) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  // Set the initial state of the checkbox based on the task's completion status
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", () => {
    handleCheckboxChange(task, checkbox);
  });

  return checkbox;
}

// Function to create the description for a task
function createDescription(task) {
  const descriptionText = document.createElement("span");
  descriptionText.classList.add("task");

  // Apply the "completed" class to completed tasks
  if (task.completed) {
    descriptionText.classList.add("completed");
  }

  descriptionText.textContent = task.description;
  return descriptionText;
}

// Function to create the date section for a task
function createDateSection(date) {
  let dateSection = document.getElementById(date);

  if (!dateSection) {
    dateSection = document.createElement("div");
    dateSection.id = date;
    dateSection.classList.add("date-section");

    const dateHeading = document.createElement("h2");
    dateHeading.textContent = date;
    dateSection.appendChild(dateHeading);

    taskList.appendChild(dateSection);
  }

  return dateSection;
}

// Function to clear the input fields
function clearInputFields() {
  dateInput.value = "";
  taskInput.value = "";
  dateInput.classList.remove("error");
  taskInput.classList.remove("error");
}

// Event handler for checkbox change
function handleCheckboxChange(task, checkbox) {
  task.toggleCompletion();
  const descriptionText = checkbox.nextSibling;
  descriptionText.classList.toggle("completed");
  updateLocalStorage();
}

// Event handler for remove button click
function handleRemoveButtonClick(task, listItem) {
  const index = tasks.indexOf(task);
  if (index !== -1) {
    tasks.splice(index, 1);
    listItem.remove();
    updateLocalStorage();
  }
}

// Event handler for add button click
function addTask() {
  const date = dateInput.value.trim();
  const description = taskInput.value.trim();

  if (date && description) {
    const newTask = new Task(date, description);
    tasks.push(newTask);
    createTaskElement(newTask);
    clearInputFields();
    updateLocalStorage();
  } else {
    if (!date) {
      dateInput.style.border = "1px solid red";
    } else {
      dateInput.style.border = "none";
    }
    if (!description) {
      taskInput.style.border = "1px solid red";
    } else {
      taskInput.style.border = "none";
    }
  }
}

// Event listener for input on date field
dateInput.addEventListener("input", () => {
  dateInput.style.border = "none";
});

// Event listener for input on task field
taskInput.addEventListener("input", () => {
  taskInput.style.border = "none";
});

// Event listener for add button click
addButton.addEventListener("click", addTask);

// Function to update the local storage with the current tasks
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to recreate task elements from tasks array
function recreateTaskElements() {
  tasks.forEach((task) => createTaskElement(task));
}

// Call the function to recreate task elements when the page loads
document.addEventListener("DOMContentLoaded", recreateTaskElements);
