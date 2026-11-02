const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addButton = document.getElementById("addTaskBtn");
// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const span = document.createElement("span");
    span.textContent = taskText;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
        deleteTask(deleteBtn);
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = "";
    taskInput.focus();
}
// Delete a task
function deleteTask(button) {
    button.parentElement?.remove();
}
// Connect the Add button
addButton.addEventListener("click", addTask);
// Connect existing Delete buttons
document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", () => {
        deleteTask(button);
    });
});
// Mark tasks as completed
taskList.addEventListener("change", function (event) {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
        const task = target.parentElement;
        if (task) {
            task.classList.toggle("completed", target.checked);
        }
    }
});
// Add a task by pressing Enter
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
export {};
//# sourceMappingURL=script.js.map