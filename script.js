const addButton = document.querySelector('.add-button')
const tasksDesk = document.querySelector('.tasks-desk')
let listItems = document.querySelectorAll('.list-item')
let appName = document.querySelector('.app-name')
let task = document.getElementById('name-of-task')
let description = document.getElementById('description-of-task')
let completeBtn 
let deleteBtn = document.querySelectorAll('.delete')

let nameOfTask
let descriptionOfTask
let sayHello = function greetings(){
    alert('hi')
}

appName.innerHTML = new Date().toString().slice(0, 24)

listItems.forEach((el) => {
    el.onclick = () => {
        console.log(typeof(el.innerText))
        el.style.textDecoration = 'line-through'//style.textDecoration = 'underline'
    }
})

task.oninput = function(){
    nameOfTask = task.value
}

description.oninput = function(){
    descriptionOfTask = description.value
}

addButton.onclick = () => {
    let longText
    let longDescription

    if(nameOfTask.length > 25){  //if name of task is too long
        longText = nameOfTask.slice(0, 25) + '...'
    }else{
        longText = nameOfTask
    }

    if(descriptionOfTask.length > 25){  //if description of task is too long
        longDescription = descriptionOfTask.slice(0, 25) + '...'
    }else{
        longDescription = descriptionOfTask
    }
    tasksDesk.insertAdjacentHTML(     //rendering task on the tasks desk
        'beforeend',
        `<div class="task">
            <div class="name-details">
                <div class="name">
                    ${longText}    
                </div>
                
                <div class="description">
                    ${longDescription}
                </div>
            </div>

            <div class="complete-delete">
                <div class="complete">
                    &#9745;
                </div>
                
                <div class="delete">
                    &#9746;
                </div>
            </div>
        </div>`
    )

    task.value = ''
    description.value = ''
    nameOfTask = ''
    descriptionOfTask = ''

    //addCompletedOnclick()
}

/* function addCompletedOnclick(){
    completedBtn = document.querySelectorAll('.complete')
    console.log(completeBtn)
    completedBtn.onclick = () => {
        target.classList.add('task-completed')
    }
} */
let nameDescription = Array.from(document.querySelectorAll('.name-details'))
//let tasksArr = document.querySelectorAll('.task')
completeBtn = Array.from(document.querySelectorAll('.complete'))
console.log(typeof(completeBtn))

completeBtn.forEach((el) => {
    let i
    console.log('hi')
    //let testt = Array.from(tasksArr)
    //console.log(testt)
    i = completeBtn.indexOf(el);
    el.onclick = () => {
        nameDescription[i].classList.add('task-complete')
    }
})

function clock(){
    appName.innerHTML = new Date().toString().slice(0, 24)
}

let timer = setInterval(() => clock(), 1000)

function completedTask(event){
    target.classList.add('task-completed')
}