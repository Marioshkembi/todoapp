let taskList = document.querySelector('.task-list');
let input = document.querySelector('.input-field');
let addBtn = document.querySelector('.add-task-btn');
let checkBoxes = document.querySelector('.check-all');
let deleteAll = document.querySelector('.delete-selected');
let multipleCompleteBtn = document.querySelector('.complete')
let completedTasksList = document.querySelector('.completedTasks');
let taskDiv = document.querySelector('.task-list-wrapper');


function addTask(evt) {
    evt.preventDefault();

    let newTask = document.createElement('li');
    newTask.className = 'task-item list-group-item';
   
    newTask.textContent = input.value;

    if (input.value === '') {
        alert("You must write something!");
    } else {
        taskList.appendChild(newTask);
    }
    saveLocalTodos(input.value);
    input.value = '';

    createElements(newTask);

}

// FUNCTION THAT CREATES ELEMENTS FOR EACH TASK
function createElements(evt) {
     // checkboxes for each task
     let check = document.createElement('input');
     check.classList.add('check-btn','custom-control-input');
     check.setAttribute("type", "checkbox");
     check.setAttribute("name", "check");
     evt.appendChild(check);
    // COMPLETE BTN
    let checkBtn = document.createElement('span');
    checkBtn.classList.add('check','absolute');
    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    evt.appendChild(checkBtn);

   
    // DELETE BTN
    let deleteBtn = document.createElement('span');
    deleteBtn.classList.add('close-btn','absolute');
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    evt.appendChild(deleteBtn);

    // EDIT BTN
    let editBtn = document.createElement('span');
    editBtn.classList.add('editBtn','absolute');
    editBtn.innerHTML = '<i class="fa fa-edit"></i>';
    evt.appendChild(editBtn);

    // EDIT INPUT FIELD
    let input = document.createElement('input');
    input.type = "text";
    input.disabled = false;
    input.value = name;
    input.classList.add('item_input','form-control','absolute');
    input.onkeyup = saveEdit;
    evt.appendChild(input);

}

// DELETE ITEM!!
function deleteTask(evt) {
    const deleteItem = evt.target;

    if (deleteItem.classList[0] === 'close-btn') {



        if (deleteItem.parentElement.parentElement === taskList) {
            deleteLocal(deleteItem.parentElement);
        } else {
            deleteCompletedLocal(deleteItem.parentElement);
        }
        deleteItem.parentElement.remove();

    }
}


function completeTask(evt) {
    let target = evt.target;
    // target.pointerEvents("none");
    if (target.classList[0] === 'check') {

        let moveTo;
        if (target.parentElement.parentElement === taskList) {
            deleteLocal(target.parentElement);
            moveTo = completedTasksList;
            target.parentElement.classList.add('checked');
            saveCompletedLocalTodos(target.parentElement.innerText);

        } else {
            deleteCompletedLocal(target.parentElement);
            target.parentElement.classList.remove('checked');
            moveTo = taskList;
            saveLocalTodos(target.parentElement.innerText);
        }
        moveTo.appendChild(target.parentElement);
        console.log()

        
    }

}

//MULTIPLE COMPLETE
function multipleComplete() {
    let checkBtn = document.querySelectorAll('.check-btn');
    let completedTasksList = document.querySelector('.completedTasks');
    let i;

    for (i =0; i<checkBtn.length; i++) {
        checkBtn.checked = false;
        if (checkBtn[i].checked === true && !checkBtn[i].parentElement.classList.contains('checked')) {

            let checkParent = checkBtn[i].parentElement;
            let moveTo;

            if (checkParent.parentElement === taskList) {
                moveTo = completedTasksList;
                deleteLocal(checkParent);
                checkParent.classList.add('checked');
                saveCompletedLocalTodos(checkParent.innerText);
            } else {
                moveTo = taskList;
                deleteCompletedLocal(checkParent.parentElement);
                checkParent.classList.remove('checked');
                saveLocalTodos(checkParent.innerText);

            }
            moveTo.appendChild(checkParent);
            console.log(moveTo)
        }

    }

}


function selectIndividually(evt) {
    let target = evt.target;

    if (target.classList[0] === 'check-btn') {
        checkBoxes.checked = false;
    }
}


function multipleDel() {
    let checkBtn = document.querySelectorAll('.check-btn');

    let i;
    for (i =0; i<checkBtn.length; i++) {
        if (checkBtn[i].checked) {
            const checkParent = checkBtn[i].parentElement;
            checkParent.remove()
            deleteLocal(checkParent);
        }

    }

}


function multipleSelect() {
    let checkBtn = document.querySelectorAll('.check-btn');
    checkBtn.checked = false;

    checkBtn.forEach(check=> {
        if (check.checked === false) {
            check.checked = true;

        } else {
            check.checked = false;
        }
    });

}


function editTxt(evt) {
    let target = evt.target;
    let parent = target.parentNode.childNodes[5];
    let check = target.parentNode.childNodes[1];
    let del = target.parentNode.childNodes[3];
    if (target.classList[0] === 'editBtn') {
        target.classList.add('edit-pressed');
        parent.classList.add('show');
        parent.focus()
        check.classList.add('disable');
        del.classList.add('disable');
        parent.value = target.parentNode.textContent;
    }

}


function saveEdit(evt) {
    let target = evt.target;
    if (target.classList[0] === 'item_input' && evt.keyCode === 13 && target.value !== "") {
        let parent = target.parentElement;

        parent.textContent = target.value;
      
        target.disabled = true;
        
        createElements(parent);
        // editLocal(evt);
    }

}

// function editLocal(evt) {
    
// }

function saveLocalTodos(evt) {
    let uncompleted;

    if(localStorage.getItem("uncompletedTodos") === null) {
        uncompleted = [];

    }else {
        uncompleted = JSON.parse(localStorage.getItem("uncompletedTodos"));

    }

    uncompleted.push(evt);
    localStorage.setItem("uncompletedTodos", JSON.stringify(uncompleted));
}

function saveCompletedLocalTodos(evt) {
    let completed;

    if(localStorage.getItem("completedTodos") === null) {
        completed = [];

    }else {
        completed = JSON.parse(localStorage.getItem("completedTodos"));

    }

    completed.push(evt);
    localStorage.setItem("completedTodos", JSON.stringify(completed));
}


function deleteLocal(evt) {
    let uncompleted;

    if(localStorage.getItem("uncompletedTodos") === null) {
        uncompleted = [];

    }else {
        uncompleted = JSON.parse(localStorage.getItem("uncompletedTodos"));
    }
    const index =  evt.textContent;

    uncompleted.splice(uncompleted.indexOf(index),1);

    localStorage.setItem("uncompletedTodos", JSON.stringify(uncompleted));
}

function deleteCompletedLocal(evt) {
    let completed;

    if(localStorage.getItem("completedTodos") === null) {
        completed = [];

    }else {
        completed = JSON.parse(localStorage.getItem("completedTodos"));
    }
    const index =  evt.textContent;

    completed.splice(completed.indexOf(index),1);


    localStorage.setItem("completedTodos", JSON.stringify(completed));
}

function getItems() {

    // if there are elements on local storage
    const local = JSON.parse(localStorage.getItem("uncompletedTodos"));
    // console.log(local);
    if (local !== null && local.length >= 1) {

        local.forEach(element => {

            let newTask = document.createElement('li');
            if (element !== '') {
                newTask.textContent = element;
                newTask.className = 'task-item list-group-item ';
                taskList.appendChild(newTask);
            }

            createElements(newTask);

        });
        }
}

function getCompletedItems() {

    // if there are elements on local storage
    const local = JSON.parse(localStorage.getItem("completedTodos"));
    // console.log(local);
    if (local !== null && local.length >= 1) {

        local.forEach(element => {

            let newTask = document.createElement('li');
            if (element !== '') {
                newTask.textContent = element;
                newTask.className = 'task-item list-group-item';
                completedTasksList.appendChild(newTask);
            }

            createElements(newTask);

        });
    }
}





getItems();
getCompletedItems()
taskDiv.addEventListener('click',selectIndividually)
addBtn.addEventListener('click', addTask);
taskDiv.addEventListener('click', deleteTask);
deleteAll.addEventListener('click', multipleDel);
checkBoxes.addEventListener('click',multipleSelect);
taskDiv.addEventListener('click',completeTask);
taskDiv.addEventListener('click',editTxt);
multipleCompleteBtn.addEventListener('click',multipleComplete);




