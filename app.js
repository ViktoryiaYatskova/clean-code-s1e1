//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector("#new-task");//Add a new task.
const addButton = document.querySelector("#addButton");
const incompleteTaskHolder = document.querySelector("#incompleteTasks");//ul of #incompleteTasks
const completedTasksHolder = document.querySelector("#completed-tasks");//completed-tasks


/** New task list item */
function createNewTaskElement(taskText = "")
{
    const listItem = document.createElement("li");
    const taskElement = document.createElement("article");
    taskElement.className = "task"
    

    //input (checkbox)
    const checkBox = document.createElement("input");//checkbx
    //label
    const label = document.createElement("label");//label
    //input (text)
    const editInput = document.createElement("input");//text
    //button.edit
    const editButton = document.createElement("button");//edit button

    //button.delete
    const deleteButton = document.createElement("button");//delete button

    label.innerText = taskText;
    label.className = "task__text";

    //Each elements, needs appending
    checkBox.type = "checkbox";
    checkBox.className = "task__input-checkbox"
    editInput.type = "text";
    editInput.className = "task__input-text input-text";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "task__button-edit text-button";

    deleteButton.className = "task__button-delete";


    //and appending.
    taskElement.appendChild(checkBox);
    taskElement.appendChild(label);
    taskElement.appendChild(editInput);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    listItem.append(taskElement)
    return listItem;
}



function addTask()
{
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;

    const listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

/** Edit an existing task. */
function editTask()
{
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    const listItem = this.parentNode;

    const editInput = listItem.querySelector(".task__input-text");
    const label = listItem.querySelector(".task__text");
    const editBtn = listItem.querySelector(".task__button-edit");
    const containsClass = listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    if (containsClass) {

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-mode");
};


/** Delete task. */
function deleteTask()
{
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


/** Mark task completed */
function taskCompleted()
{
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


function taskIncomplete()
{
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



function ajaxRequest()
{
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


/**
 * Binds events on task
 * @param {HTMLElement} taskListItem 
 * @param {function} checkboxEventHandler 
 */
function bindTaskEvents(taskListItem, checkboxEventHandler)
{
    console.log("bind list item events");
    console.log(taskListItem);
    //select ListItems children
    const checkBox = taskListItem.querySelector(".task__input-checkbox");
    const editButton = taskListItem.querySelector(".task__button-edit");
    const deleteButton = taskListItem.querySelector(".task__button-delete");

    console.log(checkBox, editButton, deleteButton)


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkboxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (const task of incompleteTaskHolder.querySelectorAll(".task")) {
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(task, taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (const task of completedTasksHolder.querySelectorAll(".task")) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(task, taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.