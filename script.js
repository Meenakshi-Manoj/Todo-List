const inputBox = document.querySelector(".input-area .text");
const inputButton = document.querySelector(".input-area button");
const todoList = document.querySelector(".todolist")
const clrbtn = document.querySelector(".footer button");
inputBox.onkeyup = ()=> {
    let typedData = inputBox.value;
    if(typedData.trim != 0) {
        inputButton.classList.add("active");
    }
    else {
        inputButton.classList.remove("active");
    }
}

addTasks();

inputButton.onclick = ()=> {
    let typedData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null) {
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(typedData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    addTasks();
}

function addTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null) {
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pending = document.querySelector(".pending");
    pending.textContent = listArr.length
    if(listArr.length > 0) {
        clrbtn.classList.add("active");
    }
    else {
        clrbtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-times"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    addTasks();
}

clrbtn.onclick = ()=> {
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    addTasks();
}
