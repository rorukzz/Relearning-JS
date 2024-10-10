let tasks = [];
const taskList = document.getElementById('task-area');

function addTask() {
    const taskInput = document.getElementById('task-txt');
    const taskText = taskInput.value;  // Use .value for input elements

    if (taskText.trim() !== "") {  // Check if the input is not empty
        tasks.push(taskText);

        const li = document.createElement('li');  // Create a new li element
        li.textContent = taskText;  // Set the text content to the current task
        taskList.appendChild(li);  // Append the li element to the ul

        taskInput.value = '';  // Clear the input field

        console.log(tasks)
    }
}

function clearTasks() {
    tasks = [] // Clearing tasks array
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    } // While there is a child(task) in the taskList element, remove it. 
}


document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('set-task')

    addButton.addEventListener('click', addTask)
})

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('clear-tasks')

    addButton.addEventListener('click', clearTasks)
})