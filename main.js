const addButton = document.getElementById("addButton");
const dateInput = document.getElementById("dateInput");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const tasks = [];

class Task {
  constructor(date, description) {
    this.date = date;
    this.description = description;
    this.completed = false;
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }
}

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

function createRemoveButton(task, listItem) {
  const removeButton = document.createElement("span");
  removeButton.classList.add("remove");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    handleRemoveButtonClick(task, listItem);
  });

  return removeButton;
}

function createCheckbox(task) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("change", () => {
    handleCheckboxChange(task, checkbox);
  });

  return checkbox;
}

function createDescription(task) {
  const descriptionText = document.createElement("span");
  descriptionText.classList.add("task");
  descriptionText.textContent = task.description;
  return descriptionText;
}

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

function clearInputFields() {
  dateInput.value = "";
  taskInput.value = "";
  dateInput.classList.remove("error");
  taskInput.classList.remove("error");
}

function handleCheckboxChange(task, checkbox) {
  task.toggleCompletion();
  const descriptionText = checkbox.nextSibling;
  descriptionText.classList.toggle("completed");
}

function handleRemoveButtonClick(task, listItem) {
  const index = tasks.indexOf(task);
  if (index !== -1) {
    tasks.splice(index, 1);
    listItem.remove();
  }
}

function addTask() {
  const date = dateInput.value.trim();
  const description = taskInput.value.trim();

  if (date && description) {
    const newTask = new Task(date, description);
    tasks.push(newTask);
    createTaskElement(newTask);
    clearInputFields();
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

dateInput.addEventListener("input", () => {
  dateInput.style.border = "none";
});

taskInput.addEventListener("input", () => {
  taskInput.style.border = "none";
});

addButton.addEventListener("click", addTask);
