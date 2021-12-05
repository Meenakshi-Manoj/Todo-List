const inputBox = document.querySelector(".input-area input");
const addBtn = document.querySelector(".input-area button");
const todoList = document.querySelector(".todolist");
const clrbtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value;
  if (userEnteredValue.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

addTasks();

addBtn.onclick = () => {
  let userEnteredValue = inputBox.value;
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorageData);
  }
  listArr.push(userEnteredValue);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  addTasks();
  addBtn.classList.remove("active");
};

function addTasks() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorageData);
  }
  const pending = document.querySelector(".pending");
  pending.textContent = listArr.length;
  if (listArr.length > 0) {
    clrbtn.classList.add("active");
  } else {
    clrbtn.classList.remove("active");
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-times"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = "";
}

function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorageData);
  listArr.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  addTasks();
}

clrbtn.onclick = () => {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorageData);
    listArr = [];
  }
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  addTasks();
};
