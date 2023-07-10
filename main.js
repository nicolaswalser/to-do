const addButton = document.getElementById("addButton");
const dateInput = document.getElementById("dateInput");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const toDos = [];

class ToDo {
  constructor(date, task) {
    this.date = date;
    this.task = task;
    this.completed = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

function createToDoItem(toDo) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const taskText = document.createElement("span");
  const removeButton = document.createElement("span");
  let dateSection = document.getElementById(toDo.date);

  if (!dateSection) {
    dateSection = document.createElement("div");
    dateSection.id = toDo.date;
    dateSection.classList.add("date-section");

    const dateHeading = document.createElement("h2");
    dateHeading.textContent = toDo.date;
    dateSection.appendChild(dateHeading);

    taskList.appendChild(dateSection);
  }

  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("change", function () {
    toDo.toggleComplete();
    taskText.classList.toggle("completed");
  });

  taskText.classList.add("task");
  taskText.textContent = toDo.task;

  removeButton.classList.add("remove");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    const index = toDos.findIndex((item) => item === toDo);
    if (index !== -1) {
      toDos.splice(index, 1);
      li.remove();
    }
  });

  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(removeButton);
  taskList.appendChild(li);
  dateSection.appendChild(li);
}

function clearInputs() {
  dateInput.value = "";
  taskInput.value = "";
  dateInput.style.border = "";
  taskInput.style.border = "";
}

addButton.addEventListener("click", function () {
  const date = dateInput.value;
  const task = taskInput.value;

  if (date && task) {
    const newToDo = new ToDo(date, task);
    toDos.push(newToDo);
    createToDoItem(newToDo);
    clearInputs();
  } else {
    if (!date) {
      dateInput.style.border = "1px solid red";
    }
    if (!task) {
      taskInput.style.border = "1px solid red";
    }
  }
});
