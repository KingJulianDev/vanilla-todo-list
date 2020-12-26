const header = document.querySelector('.header')
const tasksDesk = document.querySelector('.tasks-desk')
const addTaskButtonn = document.querySelector('.add-task-button')

function clock(){
    header.innerHTML = new Date().toString().slice(0, 24)
    setInterval(() => {header.innerHTML = new Date().toString().slice(0, 24)}, 1000)
}
clock()

addTaskButtonn.onclick = () => {
    tasksDesk.insertAdjacentHTML(
        'beforeend',
        `
        <div class="task">
                <div class="top-task-panel">
                    <div class="name-of-task">Buy some food and some toys and a new car</div>
                    <div class="task-info">
                        <div class="is-time-limited">O</div>
                        <div class="is-important">!</div>
                    </div>
                </div>

                <div class="bottom-task-panel">
                    <div class="details-btn">See details</div>
                    <div class="done-btn">Done</div>
                </div>
            </div>
        `
    )
}