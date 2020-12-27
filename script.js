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

let tasks
let doneButtons
let tasksArr = [] // array with tasks

function clock(){
    header.innerHTML = new Date().toString().slice(0, 24)
    setInterval(() => {header.innerHTML = new Date().toString().slice(0, 24)}, 1000)
}
clock()

let isModalVisible = false

function checkIsModalVisible(){
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

let isDateInputActive = false
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

function testing(){
    tasks = document.querySelectorAll('.task')
    doneButtons = document.querySelectorAll('.done-btn')
    let i = Array.from(doneButtons)
    
    i.forEach((el) => {
        el.onclick = () => {
            (tasks[i.indexOf(el)].classList.contains('task-done')) ? tasks[i.indexOf(el)].classList.remove('task-done') :
            tasks[i.indexOf(el)].classList.add('task-done');
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
                <div class="done-btn">Done</div>
            </div>
        
        </div>
        `
    )
    checkIsModalVisible()
    testing()
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