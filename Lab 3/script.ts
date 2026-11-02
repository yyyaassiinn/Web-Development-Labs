
const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
const addButton = document.getElementById("addTaskBtn") as HTMLButtonElement;

// Add a new task
function addTask(): void {
    const taskText: string = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li: HTMLLIElement = document.createElement("li");

    const checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";

    const span: HTMLSpanElement = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn: HTMLButtonElement = document.createElement("button");
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
function deleteTask(button: HTMLButtonElement): void {
    button.parentElement?.remove();
}

// Connect the Add button
addButton.addEventListener("click", addTask);

// Connect existing Delete buttons
document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", () => {
        deleteTask(button as HTMLButtonElement);
    });
});

// Mark tasks as completed
taskList.addEventListener("change", function (event: Event): void {
    const target = event.target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
        const task = target.parentElement;

        if (task) {
            task.classList.toggle("completed", target.checked);
        }
    }
});

// Add a task by pressing Enter
taskInput.addEventListener("keydown", function (event: KeyboardEvent): void {
    if (event.key === "Enter") {
        addTask();
    }
});
