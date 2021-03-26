const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incompleted-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  listItem.className = "ul-tasks__list";
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");
  label.innerText = taskString;
  label.className = "list__task";

  checkBox.type = "checkbox";
  checkBox.className = "list__input-checkbox";
  editInput.type = "text";
  editInput.classList.add("list__edit-task");
  editInput.classList.add("input-hidden");

  editButton.innerText = "Edit";
  editButton.className = "list__button-edit";

  deleteButton.className = "list__button-delete";
  deleteButtonImg.src = "./img/remove.svg";
  deleteButtonImg.className = "list__img-delete";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;
  const parentListItem = listItem.parentNode;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".list__button-edit");
  const containsClass = listItem.classList.contains("edit-mode");
  parentListItem.getAttribute("id") === "completed-tasks" ? label.classList.add("task-complete") : label.classList.remove("task-complete");
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("edit-mode");
  editInput.classList.toggle("input-hidden");
  editInput.classList.toggle("input-visible");
  label.classList.toggle("label-hidden");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  const label = listItem.querySelector("label");
  if (!listItem.classList.contains("edit-mode")) {
    label.classList.toggle("task-complete");
  }
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  const label = listItem.querySelector("label");
  if (!listItem.classList.contains("edit-mode")) {
    label.classList.remove("task-complete");
  }
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const ajaxRequest = function () {
  console.log("AJAX Request");
};

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector(".list__input-checkbox");
  const editButton = taskListItem.querySelector(".list__button-edit");
  const deleteButton = taskListItem.querySelector(".list__button-delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}