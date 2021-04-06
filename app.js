const addButton = document.querySelector(".add__submit")
const addTask = document.querySelector(".add__task");
const planList = document.querySelector(".plan__list");
const planItemList  = document.querySelectorAll(".plan__item")
const completedList = document.querySelector(".completed__list")


function removeItemList(li) {
  li.remove()
}

function changeTask(li) {
  let lable = li.children[1];
  let input = li.children[2];
  if(!li.classList.contains("edit")){
    li.classList.add("edit");
    li.children[3].innerText = "Save"
    input.value = lable.innerText;
  }else{
    li.classList.remove("edit");
    li.children[3].innerText = "Edit"
    lable.innerText=input.value
  }
}

function changeConditionToCompleted(li) {
  let lable = li.children[0]
  if(lable.checked&&li.classList.contains("plan__item")){
    li.classList.remove("plan__item");
    li.classList.add("completed__item");

    li.children[0].classList.remove("plan__check");
    li.children[0].classList.add("completed__check");

    li.children[1].classList.remove("plan__task");
    li.children[1].classList.add("completed__task");

    li.children[2].classList.remove("plan__input");
    li.children[2].classList.add("completed__input");

    li.children[3].classList.remove("plan__edit");
    li.children[3].classList.add("completed__edit");

    li.children[4].classList.remove("plan__delete");
    li.children[4].classList.add("completed__delete");
    
    completedList.append(li)
  } else if (!lable.checked&&li.classList.contains("completed__item")){
    li.classList.remove("completed__item");
    li.classList.add("plan__item");

    li.children[0].classList.remove("completed__check");
    li.children[0].classList.add("plan__check");

    li.children[1].classList.remove("completed__task");
    li.children[1].classList.add("plan__task");

    li.children[2].classList.remove("completed__input");
    li.children[2].classList.add("plan__input");

    li.children[3].classList.remove("completed__edit");
    li.children[3].classList.add("plan__edit");

    li.children[4].classList.remove("completed__delete");
    li.children[4].classList.add("plan__delete");
    
    planList.append(li)
  }
}


addButton.addEventListener("click", function(e){
  let taskMessage = addTask.value;
  if(taskMessage){
    planList.insertAdjacentHTML("beforeend",`<li class="plan__item">
    <input class="plan__check" type="checkbox">
    <label class="plan__task">${taskMessage}</label>
    <input class="plan__input" type="text">
    <button class="plan__edit">Edit</button>
    <button class="plan__delete">
    <img class="plan__img" src="./remove.svg"></button>
  </li>`)
  addTask.value = ""
  }
})

planList.addEventListener("click",function (event) {
  if(event.target.closest(".plan__delete")){
    removeItemList(event.target.closest(".plan__item"))
  }else if (event.target.classList.contains("plan__edit")){
    changeTask(event.target.closest(".plan__item"))
  }else if (event.target.classList.contains("plan__check")){
    changeConditionToCompleted(event.target.closest(".plan__item"))
  }
});

completedList.addEventListener("click",function (event) {
  if(event.target.closest(".completed__delete")){
    removeItemList(event.target.closest(".completed__item"))
  }else if (event.target.classList.contains("completed__edit")){
    changeTask(event.target.closest(".completed__item"))
  }else if (event.target.classList.contains("completed__check")){
    changeConditionToCompleted(event.target.closest(".completed__item"))
  }
});