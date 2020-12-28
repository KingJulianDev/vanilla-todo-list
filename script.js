const header = document.querySelector('.header')
const tasksDesk = document.querySelector('.tasks-desk')
const addTaskButton = document.querySelector('.add-task-button')
const modal = document.querySelector('.modal')
const limitedBtn = document.querySelector('.limited')
const dateInput = document.getElementById('modal-time-limited')
const confirmTask = document.querySelector('.add-task')
const nameOfTaskInput = document.getElementById('name-input')
const detailsOfTaskInput = document.getElementById('details-input')

let nameOfTask 
let detailsOfTask

let tasks           //массив тасков
let doneButtons     //массив кнопок "сделано"
let deleteButtons   //массив кнопок "удалить"
let tasksArr = [] // array with tasks

function clock(){
    header.innerHTML = new Date().toString().slice(0, 24)
    setInterval(() => {header.innerHTML = new Date().toString().slice(0, 24)}, 1000)
}
clock()

let isModalVisible = false

function checkIsModalVisible(){ //проверяет видимо ли модальное окно
    isModalVisible = !isModalVisible
    if(isModalVisible === true){
        modal.style.visibility = "visible"
    }else{
        modal.style.visibility = 'hidden'
    }
}

addTaskButton.onclick = () => {
    checkIsModalVisible()
}

let isDateInputActive = false // проверяет активен ли инпут даты
limitedBtn.onclick = () => {
    isDateInputActive = !isDateInputActive
    if(isDateInputActive === true){
        dateInput.disabled = false
        limitedBtn.classList.add('limited-active')
    }else{
        dateInput.disabled = true
        limitedBtn.classList.remove('limited-active')
    }
    
}

function addOnClicksOnTasks(){ //добавляет к таскам онклики
    tasks = document.querySelectorAll('.task')
    deleteButtons = document.querySelectorAll('.delete-btn')

    let everyTask = Array.from(tasks)

    everyTask[everyTask.length-1].addEventListener('click', function(event){
        let target = event.target 
        if(target.className != 'delete-btn' && target.classList != 'details-btn'){
            (tasks[everyTask.length-1].classList.contains('task-done')) ? tasks[everyTask.length-1].classList.remove('task-done') :
            tasks[everyTask.length-1].classList.add('task-done');
        }
    })
    
    /* everyTask.forEach((el) => {             //делает таск выполненым и не касается кнопок
        el.addEventListener('click', function(event){
            let target = event.target 
            if(target.className != 'delete-btn' && target.classList != 'details-btn'){
                (tasks[everyTask.indexOf(el)].classList.contains('task-done')) ? tasks[everyTask.indexOf(el)].classList.remove('task-done') :
                tasks[everyTask.indexOf(el)].classList.add('task-done');
            }
        })
    }) */

    let everyDeleteBtn = Array.from(deleteButtons)

    everyDeleteBtn.forEach((el) => {
        el.onclick = () => {
            tasks[everyDeleteBtn.indexOf(el)].remove()
        }
    })

}

confirmTask.onclick = () => {
    nameOfTask = nameOfTaskInput.value
    detailsOfTask = detailsOfTaskInput.value

    tasksArr.push({name: nameOfTask, details: detailsOfTask, isImportant: false, isTimeLimited: false})

    tasksDesk.insertAdjacentHTML(
        'beforeend',
        `
        <div class="task">

            <div class="top-task-panel">
                <div class="name-of-task">${nameOfTask}</div>
                <div class="task-info">
                    <div class="is-time-limited">&#x1F551;</div>
                    <div class="is-important">&#x2755;</div>
                </div>
            </div>

            <div class="bottom-task-panel">
                <div class="details-btn">See details</div>
                <div class="delete-btn">&#10008;</div>  
            </div>
        
        </div>
        `
    )
    checkIsModalVisible()
    addOnClicksOnTasks()
    nameOfTaskInput.value = ''
}

/* let obj = {
    name: nameOfTask,
    descripion: descripionOfTask,
    isImportant: false,
    isTimeLimited: false,
} */


/* let test1 = 'buy some milk'
let taskForm = 
    `<div class="task">
        <div class="top-task-panel">
            <div class="name-of-task">${nameOfTask}</div>
            <div class="task-info">
                <div class="is-time-limited">O</div>
                <div class="is-important">!</div>
            </div>
        </div>

        <div class="bottom-task-panel">
            <div class="details-btn" onclick="testing()">See details</div>
            <div class="done-btn">Done</div>
        </div>
        
    </div>` */

    /* everyTask.forEach((el) => {
        el.onclick = () => {
            (tasks[everyTask.indexOf(el)].classList.contains('task-done')) ? tasks[everyTask.indexOf(el)].classList.remove('task-done') :
            tasks[everyTask.indexOf(el)].classList.add('task-done');
        }
    }) */

     /* let deleteBtn = document.querySelectorAll('.delete-btn')

    deleteBtn.forEach((el) => {
        el.onclick = () => {
            alert(15)
        }
    }) */