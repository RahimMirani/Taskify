// Select Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Select Sidebar Elements
const sidebarButtons = document.querySelectorAll('.sidebar button');

// Select New Workplace Elements
const workplaceInput = document.getElementById('workplace-input');
const addWorkplaceBtn = document.getElementById('add-workplace-btn');
const workplaceList = document.querySelector('.sidebar ul');

// Filter Tasks Function
sidebarButtons.forEach(button => {
    button.addEventListener('click', () => {
        const workplace = button.getAttribute('data-workplace');
        filterTasks(workplace);
    });
});

function filterTasks(workplace) {
    const tasks = taskList.querySelectorAll('li');
    tasks.forEach(task => {
        if (task.getAttribute('data-workplace') === workplace || workplace === 'all') {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });

    // Update active button
    sidebarButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.sidebar button[data-workplace="${workplace}"]`).classList.add('active');
}

// Add Workplace Function
addWorkplaceBtn.addEventListener('click', () => {
    const workplaceName = workplaceInput.value.trim();
    if (workplaceName !== "") {
        const workplaceItem = document.createElement('li');
        workplaceItem.innerHTML = `<button data-workplace="${workplaceName.toLowerCase()}">${workplaceName}</button>`;
        workplaceList.appendChild(workplaceItem);

        // Clear Input
        workplaceInput.value = "";

        // Add Event Listener to New Workplace Button
        workplaceItem.querySelector('button').addEventListener('click', () => {
            filterTasks(workplaceName.toLowerCase());
        });
    }
});

// Add Task Function
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value;
    const selectedWorkplace = document.querySelector('.sidebar button.active').getAttribute('data-workplace');

    if (taskText.trim() !== "") {
        const taskItem = document.createElement('li');
        taskItem.setAttribute('data-workplace', selectedWorkplace);
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(taskItem);

        // Clear Input
        taskInput.value = "";

        // Delete Task
        taskItem.querySelector('.delete-btn').addEventListener('click', () => {
            taskItem.remove();
        });
    }
});
