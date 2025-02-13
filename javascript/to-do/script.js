// Select elements from the DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(listItem => {
        tasks.push({
            text: listItem.querySelector(".task-text").textContent,
            completed: listItem.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to create task element
function createTaskElement(taskText, isCompleted = false) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="edit-btn">✎</button>
        <button class="complete-btn">✔</button>
        <button class="delete-btn">✖</button>
    `;

    if (isCompleted) {
        listItem.classList.add("completed");
    }

    // Add event listener for editing tasks
    listItem.querySelector(".edit-btn").addEventListener("click", () => {
        const newText = prompt("Edit your task:", listItem.querySelector(".task-text").textContent);
        if (newText !== null && newText.trim() !== "") {
            listItem.querySelector(".task-text").textContent = newText.trim();
            saveTasks();
        }
    });

    // Add event listener for completing tasks
    listItem.querySelector(".complete-btn").addEventListener("click", () => {
        listItem.classList.toggle("completed");
        saveTasks();
    });

    // Add event listener for deleting tasks
    listItem.querySelector(".delete-btn").addEventListener("click", () => {
        listItem.remove();
        saveTasks();
    });

    taskList.appendChild(listItem);
    saveTasks();
}

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    createTaskElement(taskText);
    taskInput.value = "";
}

// Event listener for adding tasks
addTaskButton.addEventListener("click", addTask);

// Allow pressing Enter to add a task
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Load tasks when the page loads
window.addEventListener("load", loadTasks);
