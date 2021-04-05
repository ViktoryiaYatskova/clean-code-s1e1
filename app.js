const addButton = document.querySelector(".add__submit")
const addTask = document.querySelector(".add__task");
const planList = document.querySelector(".plan__list");
const planItemList  = document.querySelectorAll(".plan__item")
const completedList = document.querySelector(".completed__list")

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

function removeItemList(li) {
    li.remove()
}

planList.addEventListener("click",function (event) {
  if(event.target.classList.contains("plan__img")){
    removeItemList(event.target.closest(".plan__item"))
  }
});


completedList.addEventListener("click",function (event) {
  if(event.target.classList.contains("completed__img")){
    removeItemList(event.target.closest(".completed__item"))
  }
});