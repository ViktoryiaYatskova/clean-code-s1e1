

let taskInput=document.getElementById("new_task");
let addButton=document.getElementsByTagName("button")[0];
let incompleteTaskHolder=document.getElementById("incomplete_Tasks");
let completedTasksHolder=document.getElementById("completed_tasks");


//New task list item
let createNewTaskElement=function(taskString){

    let listItem=document.createElement("li");

    //input (checkbox)
    let checkBox=document.createElement("input");
    //label
    let label=document.createElement("label");
    //input (text)
    let editInput=document.createElement("input");
    //button.edit
    let editButton=document.createElement("button");

    //button.delete
    let deleteButton=document.createElement("button");
    let deleteButtonImg=document.createElement("img");

    label.innerText=taskString;
    label.className='task';

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="task";

    editButton.innerText="Edit"; 
    editButton.className="edit";

    deleteButton.className="delete";
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



let addTask=function(){
    console.log("Add Task...");
   
    if (!taskInput.value) return;
    let listItem=createNewTaskElement(taskInput.value);

    
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}


let editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    let listItem=this.parentNode;

    let editInput=listItem.querySelector('input[type=text]');
    let label=listItem.querySelector("label");
    let editBtn=listItem.querySelector(".edit");
    let containsClass=listItem.classList.contains("edit_Mode");
   
    if(containsClass){

        
      
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    
    listItem.classList.toggle("edit_Mode");
};


//Delete task.
let deleteTask=function(){
    console.log("Delete Task...");

    let listItem=this.parentNode;
    let ul=listItem.parentNode;
 
    ul.removeChild(listItem);

}


//Mark task completed
let taskCompleted=function(){
    console.log("Complete Task...");

    
    let listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


let taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
 
    let listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



let ajaxRequest=function(){
    console.log("AJAX Request");
}


addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


let bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    let checkBox=taskListItem.querySelector("input[type=checkbox]");
    let editButton=taskListItem.querySelector("button.edit");
    let deleteButton=taskListItem.querySelector("button.delete");


   
    editButton.onclick=editTask;
  
    deleteButton.onclick=deleteTask;
   
    checkBox.onchange=checkBoxEventHandler;
}


for (let i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}





for (let i=0; i<completedTasksHolder.children.length;i++){
   
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}


