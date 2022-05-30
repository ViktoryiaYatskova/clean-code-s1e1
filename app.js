var taskInput=document.getElementById("new-task");
var addButton=document.querySelector(".new-task__btn-add");
var incompleteTaskHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    var checkBox=document.createElement("input");
    var label=document.createElement("label");
    var editInput=document.createElement("input");
    var editButton=document.createElement("button");

    //button.delete
    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");

    label.innerText=taskString;
    label.className="task__title task-style";

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="task__check";
    editInput.type="text";
    editInput.className="task__input task-style task-view";

    editButton.innerText="Edit";
    editButton.className="btn task__btn-edit";

    deleteButton.className="btn task__btn-remove";
    deleteButtonImg.src="./remove.svg";
    deleteButtonImg.alt="Remove";
    deleteButtonImg.className="task__remove-img";
    deleteButton.appendChild(deleteButtonImg);

    listItem.className="task";

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}


//Add task
var addTask=function() {
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";
}

//Edit an existing task.
var editTask=function(){
    var listItem=this.parentNode;

    var editInput=listItem.querySelector(".task__input");
    var label=listItem.querySelector(".task__title");
    var editBtn=listItem.querySelector(".task__btn-edit");
    var containsClass=listItem.classList.contains("edit-mode");

    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    listItem.classList.toggle("edit-mode");
};


//Delete task.
var deleteTask=function(){
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);
}


//Mark task completed
var taskCompleted=function(){
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

//Mark task as incomplete.
var taskIncomplete=function(){
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

//Set the click handler to the addTask function.
addButton.addEventListener("click",addTask);


//Bind task events
var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    var checkBox=taskListItem.querySelector(".task__check");
    var editButton=taskListItem.querySelector(".task__btn-edit");
    var deleteButton=taskListItem.querySelector(".task__btn-remove");

    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
