let tasks = [];
let i = 0;
let tasks_markup = [];
const task_listElement = document.querySelector(".task-container");

const text_input = document.querySelector("#add-task");

text_input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") addTask();
});

/**
 * Renders all tasks from the tasks array
 * And updates their state
 */
function renderTasksMarkup() {
  console.log(tasks);

  const markup = `
    ${tasks
      .map((task) => {
        return `
                <div class="task-holder" id=${task.id} onclick="taskComplete(${task.id})">
                    <label style="font-size:medium; font-weight:500" 
                           class="${task.status ? "done" : ""}"
                    >
                    ${task.title}
                    </label>
                    <button class="delete-button" onclick="deleteTask(${
                      task.id
                    })">Delete</button>
                </div>
      `;
      })
      .join(`<br>`)}
  `;

  task_listElement.innerHTML = markup;

  // Commented for future reference
  // const all_tasks = document.querySelectorAll("label");

  // for (const task of all_tasks) {
  //   task.addEventListener("click", function () {
  //     const found = tasks.find((t) => t.id == task.id);
  //     if (found) {
  //       console.log(task);
  //       task.classList.toggle("done");
  //       console.log(task);
  //       found.status = !found.status;
  //     }
  //   });
  //
}

function taskComplete(id) {
  tasks.find(task => {
    if (task.id == id)
      task.status = !task.status;
  });

  renderTasksMarkup();
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
