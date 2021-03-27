//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.
// Event handling, user interaction is what starts the code execution.
var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.querySelector(".incomplete-tasks");
var completedTasksHolder=document.querySelector(".completed-tasks");
//New task list item
var createNewTaskElement=function(taskString){
    var listItem=document.createElement("li");
    var checkBox=document.createElement("input");
    var label=document.createElement("label");
    var editInput=document.createElement("input");//text
    var editButton=document.createElement("button");
    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");
    label.innerText=taskString;
    label.className="task";
    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="task";
    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="edit";
    deleteButton.className="delete";
    deleteButtonImg.src="./remove.svg";
    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox); //and appending.
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask=function(){
    if (!taskInput.value) return; //Create a new list item with the text from the #new-task:
    var listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem); //Append listItem to incompleteTaskHolder
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
}
//Edit an existing task.
var editTask=function(){
    var listItem=this.parentNode;
    var editInput=listItem.querySelector("input[type=text]");
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".edit");
    var containsClass=listItem.classList.contains("editMode");
    if(containsClass){  //If class of the parent is .editmode
        label.innerText=editInput.value; //switch to .editmode
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }   
    listItem.classList.toggle("editMode");  //toggle .editmode on the parent.
}
//Delete task.
var deleteTask=function(){
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem); //Remove the parent list item from the ul.
}
//Mark task completed
var taskCompleted=function(){
    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}
var taskIncomplete=function(){
    //When the checkbox is unchecked
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem); //Append the task list item to the #incomplete-tasks.
    bindTaskEvents(listItem,taskCompleted);
}
var ajaxRequest=function(){ 
}
//The glue to hold it all together.
//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);
var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
   //select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete");
    editButton.onclick=editTask; //Bind editTask to edit button.
    deleteButton.onclick=deleteTask; //Bind deleteTask to delete button.
    checkBox.onchange=checkBoxEventHandler; //Bind taskCompleted to checkBoxEventHandler.
}
for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}
for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
// Issues with usability don"t get seen until they are in front of a human tester.
//prevent creation of empty tasks.
//TODO:Change edit to save when you are in edit mode.
