var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.getElementById("incompleted-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.className='list';

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className='task';



    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="input";
    editInput.type="text";
    editInput.classList.add("edit-task");
    editInput.classList.add("input-hidden");

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="button-edit";

    deleteButton.className="button-delete";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className="img-delete";
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    var listItem=this.parentNode;
    const parentListItem = listItem.parentNode;
    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".button-edit");
    var containsClass=listItem.classList.contains("edit-mode");
    parentListItem.getAttribute("id") === "completed-tasks" ? 
    label.classList.add("task-complete") : 
    label.classList.remove("task-complete");
    if (containsClass) {
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    } else {
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }
    listItem.classList.toggle("edit-mode");
    editInput.classList.toggle("input-hidden");
    editInput.classList.toggle("input-visible");
    label.classList.toggle("label-hidden");
};

//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    var listItem=this.parentNode;
    const label = listItem.querySelector("label");
    if (!listItem.classList.contains("edit-mode")) {
        label.classList.toggle("task-complete");
    }
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");

    var listItem=this.parentNode;
    const label = listItem.querySelector("label");
    if (!listItem.classList.contains("edit-mode")) {
        label.classList.remove("task-complete");
    }
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector(".button-edit");
    var deleteButton=taskListItem.querySelector(".button-delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.