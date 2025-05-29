let tasks = [];
let i = 0;
let tasks_markup = [];
const task_listElement = document.querySelector(".task-container");

/**
 * Renders all tasks from the tasks array
 * And updates their state
 */
function renderTasksMarkup() {
  console.log(tasks);

  const markup = `
    ${tasks
      .map((task) => {
        if (task.status) {
          return `
                <div class="task-holder">
                    <label id=${task.id} style="font-size:medium; font-weight:500" class="done"}>
                        <input type="checkbox" checked>
                        ${task.title}
                    </label>
                    <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
        } else {
          return `
                <div class="task-holder">
                    <label id=${task.id} style="font-size:medium; font-weight:500">
                        <input type="checkbox">
                        ${task.title}
                    </label>
                    <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
        }
      })
      .join(`<br>`)}
  `;

  task_listElement.innerHTML = markup;
  const all_tasks = document.querySelectorAll("label");

  for (const task of all_tasks) {
    task.addEventListener("click", function () {
      const found = tasks.find((t) => t.id == task.id);
      if (found) {
        task.classList.add("done");
        found.status = true;
      }
    });
  }
}

function deleteTask(task_id) {
  const task_delete = tasks.find((task) => task.id == task_id);
  let newTaskList = [];

  for (const task of tasks) {
    if (!(task === task_delete)) {
      newTaskList.push(task);
    } else {
      continue;
    }
  }

  tasks = newTaskList;
  renderTasksMarkup();
}

/**
 * Adds a new task when button is prompted
 */
function addTask() {
  const task_name = document.getElementById("add-task").value;
  const task = {
    title: task_name,
    status: false,
    id: i++,
  };

  tasks.push(task);

  renderTasksMarkup();

  document.getElementById("add-task").value = "";
}
