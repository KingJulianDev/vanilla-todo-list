const clock = document.querySelector('.clock')
const tasksDesk = document.querySelector('.tasks-desk')
const addTaskButton = document.querySelector('.add-task-button')
const modal = document.querySelector('.modal')
const limitedBtn = document.querySelector('.limited')
const importantBtn = document.querySelector('.important')
const dateInput = document.getElementById('modal-time-limited')
const confirmTask = document.querySelector('.add-task')
const nameOfTaskInput = document.getElementById('name-input')
const detailsOfTaskInput = document.getElementById('details-input')
const modalDetails = document.querySelector('.modal-details')
const detailsContent = document.querySelector('.details-content') 
const closeDetails = document.querySelector('.close-details')
const timeLimitedDetails = document.querySelector('.time-limited-details')

const filterAllButton = document.getElementById('all')
const filterDoneButton = document.getElementById('done')
const filterImportantButton = document.getElementById('important')
const filterUrgentButton = document.getElementById('urgent')

let nameOfTask 
let detailsOfTask

let tasks               //массив тасков
let doneButtons         //массив кнопок "сделано"
let deleteButtons       //массив кнопок "удалить"
let importantButtons    //массив кнопок "важно"
let detailsButtons      //массив кнопок "посмотреть детали"
let tasksArr = []       //array with tasks object
let filterButtonsArr = [
    {name: 'urgent', isActive: true},
    {name: 'important', isActive: false},
    {name: 'done', isActive: false},
    {name: 'all', isActive: false}
]
let arrayOfFilterButtons = [filterAllButton, filterDoneButton, filterImportantButton, filterUrgentButton]

function checkFilterButtonStatus(){
        filterButtonsArr.forEach((el) => {
            if(filterButtonsArr[filterButtonsArr.indexOf(el)].isActive === true){
                arrayOfFilterButtons[filterButtonsArr.indexOf(el)].classList.add('filter-btn-active')
            }else{
                arrayOfFilterButtons[filterButtonsArr.indexOf(el)].classList.remove('filter-btn-active')
            }
        })
}
checkFilterButtonStatus()

function clockF(){
    clock.innerHTML = new Date().toString().slice(0, 24)
    setInterval(() => {clock.innerHTML = new Date().toString().slice(0, 24)}, 1000)
}
clockF()

let isModalVisible = false
let isModalDetailsVisible = false

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

let isImportantBtnActive = false // проверяет активна ли кнопка "важно"

importantBtn.onclick = () => {
    isImportantBtnActive = !isImportantBtnActive
    if(isImportantBtnActive === true){
        importantBtn.classList.add('important-active')
    }else{
        importantBtn.classList.remove('important-active')
    }
}

closeDetails.onclick = () => {
    isModalDetailsVisible = false
    modalDetails.style.visibility = 'hidden'
}

function addOnclicksOnDetailsButtons(){
    detailsButtons = Array.from(document.querySelectorAll('.details-btn'))
    detailsButtons.forEach((el) => {
        el.onclick = () =>{
            let index = detailsButtons.indexOf(el)
            modalDetails.style.visibility = 'visible'
            detailsContent.innerHTML = tasksArr[detailsButtons.indexOf(el)].details
            timeLimitedDetails.innerHTML = "Do before " + tasksArr[index].doBefore
        }
    })
}

function addOnclicksOnDeleteButtons(){
    deleteButtons = Array.from(document.querySelectorAll('.delete-btn'))
    tasks = Array.from(document.querySelectorAll('.task'))
    deleteButtons.forEach((el) => {
        let index 
        el.onclick = () => {
            index = deleteButtons.indexOf(el)
            deleteButtons = Array.from(document.querySelectorAll('.delete-btn'))
            detailsButtons = Array.from(document.querySelectorAll('.details-btn'))
            tasks = Array.from(document.querySelectorAll('.task'))
            deleteButtons.splice(index, 1)
            detailsButtons.splice(index, 1)
            tasks[index].remove()
            tasks.splice(index, 1)
            tasksArr.splice(index, 1)
        }
    })
}

function addOnclicksOnTasks(){
    tasks = Array.from(document.querySelectorAll('.task'))
    tasks.forEach((el) => { 
        el.onclick = (event) => {
            let index = tasks.indexOf(el)
            if(event.target.className != 'delete-btn' && event.target.className != 'details-btn'){
                if(tasksArr[index].isDone === true){    // проверяет на выполненость таска
                    tasks[index].classList.remove('task-done')
                    tasksArr[index].isDone = false
                    detailsButtons[index].style.backgroundColor = '#91B4D1'
                    deleteButtons[index].style.backgroundColor = '#91B4D1'
                    
                }else{
                    tasks[index].classList.add('task-done')
                    tasksArr[index].isDone = true
                    detailsButtons[index].style.backgroundColor = '#73CF8C'
                    deleteButtons[index].style.backgroundColor = '#73CF8C'
                }
            }
        }
    })
    tasks[tasks.length-1].addEventListener('mouseenter', function(event){
        let tasks = Array.from(document.querySelectorAll('.task'))
        let index = tasks.indexOf(event.target)
        console.log(index)
        deleteButtons[index].style.visibility = 'visible'
        detailsButtons[index].style.visibility = 'visible'
    })

    tasks[tasks.length-1].addEventListener('mouseleave', function(event){
        let tasks = Array.from(document.querySelectorAll('.task'))
        let index = tasks.indexOf(event.target)
        deleteButtons[index].style.visibility = 'hidden'
        detailsButtons[index].style.visibility = 'hidden'
    })
}

function addOnClicksOnTasks(){ 
    addOnclicksOnDetailsButtons()   //добавляет онклики к кнопкам деталей
    addOnclicksOnDeleteButtons()    //добавляет онклики к кнопкам удаления
    addOnclicksOnTasks()            //добавляет онклики к таскам
}

confirmTask.onclick = () => {       //рендерит таск и вызывает функцию добавления онкликов
        nameOfTask = nameOfTaskInput.value
        detailsOfTask = detailsOfTaskInput.value

    tasksArr.push({
        name: nameOfTask, 
        details: detailsOfTask, 
        isUrgent: isDateInputActive, 
        isImportant: isImportantBtnActive,
        isDone: false,
        doBefore: dateInput.value
    })

    tasksDesk.insertAdjacentHTML(
        'beforeend',
        `
        <div class="task">

            <div class="top-task-panel">
                <div class="name-of-task">${nameOfTask}</div>
                <div class="task-info">
                    <div class="is-time-limited"></div>
                    <div class="is-important"></div>
                </div>
            </div>

            <div class="bottom-task-panel">
                <div class="details-btn">Details</div>
                <div class="delete-btn">&#10008;</div>  
            </div>
        
        </div>
        `
    )
    checkIsModalVisible()
    addOnClicksOnTasks()

    if(isImportantBtnActive === true){
        let importantBtns = document.querySelectorAll('.is-important')
        importantBtns[importantBtns.length-1].innerHTML = '&#x2755;'
    }

    if(isDateInputActive === true){
        let limitedBtns = document.querySelectorAll('.is-time-limited')
        limitedBtns[limitedBtns.length-1].innerHTML = '&#x1F551;'
    }

    function modalToDefault(){           //возвращет модалку в исходное состояние
        nameOfTaskInput.value = ''
        detailsOfTaskInput.value = ''
        isImportantBtnActive = false
        isDateInputActive = false
        importantBtn.classList.remove('important-active')
        limitedBtn.classList.remove('limited-active')
        dateInput.disabled = true
        dateInput.value = ''
    }
    modalToDefault()
    checkFilterButtonStatus()
}

//////////////////////////////FILTER//////////////////////////////////////////////////////
function filterImportant(){         //фильтр важных
    filterAll()
    tasksArr.forEach((el) => {
        let index = tasksArr.indexOf(el)
        if(tasksArr[index].isImportant === false){
            tasks[index].style.display = 'none'
        }
    })
}
filterImportantButton.onclick = () => {
    filterButtonsArr.forEach((el) => {
        el.isActive = false
    })
    filterButtonsArr[2].isActive = true
    filterImportant()
    checkFilterButtonStatus()
}

function filterUrgent(){            //фильтр срочных
    filterAll()
    tasksArr.forEach((el) => {
        let index = tasksArr.indexOf(el)
        if(tasksArr[index].isUrgent === false){
            tasks[index].style.display = 'none'
        }
    })
}
filterUrgentButton.onclick = () => {
    filterButtonsArr.forEach((el) => {
        el.isActive = false
    })
    filterButtonsArr[3].isActive = true
    filterUrgent()
    checkFilterButtonStatus()
}

function filterDone(){          //фильтр выполненых
    filterAll()
    tasksArr.forEach((el) => {
        let index = tasksArr.indexOf(el)
        if(tasksArr[index].isDone === false){
            tasks[index].style.display = 'none'
        }
    })
}
filterDoneButton.onclick = () => {
    filterButtonsArr.forEach((el) => {
        el.isActive = false
    })
    filterButtonsArr[1].isActive = true
    filterDone()
    checkFilterButtonStatus()
}

function filterAll(){           //показать все
    for(let i = 0; i < tasksArr.length; i++){
        tasks[i].style.display = 'unset'
    }
}
filterAllButton.onclick = () => {
    filterButtonsArr.forEach((el) => {
        el.isActive = false
    })
    filterButtonsArr[0].isActive = true
    filterAll()
    checkFilterButtonStatus()
}


