let tasks = [];
let i = 0;
const task_listElement = document.querySelector(".task-container");

const text_input = document.querySelector("#add-task");
text_input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") addTask();
});

function deleteCompleted() {
  for (const task of tasks) {
    if (task.status) deleteTask(task.id);
  }
}

/**
 * Renders all tasks from the tasks array
 * And updates their state
 */
function renderTasksMarkup() {
  console.log(tasks);

  const incompleteMarkup = `
    ${tasks
      .map((task) => {
        if (!task.status) {
          return `
                <div class="task-holder" id=${task.id} onclick="taskComplete(${task.id})">
                    <div class="task-details" style="padding-top:5px;" >
                      <label style="font-size:20px;font-weight:700" 
                             class="${task.status ? "done" : ""}"
                      >
                    ${task.title}
                    </label>
                    <br>
                    <label class="date">Date: ${task.date}</label>
                    </div>
                    <button class="delete-button" onclick="deleteTask(${
                      task.id
                    })">Delete</button>
                </div>
          `;
        }
      })
      .join(`<br>`)}
  `;

  const completeMarkup = `
    ${tasks
      .map((task) => {
        if (task.status) {
          return `
                <div class="task-holder" id=${task.id} onclick="taskComplete(${task.id})">
                    <div class="task-details" style="padding-top:5px;">
                      <label style="font-size:20px;  font-weight:700" 
                             class="${task.status ? "done" : ""}"
                      >
                    ${task.title}
                    </label>
                    <br>
                    <label class="date">Date: ${task.date}</label>
                    </div>
                    <button class="delete-button" onclick="deleteTask(${
                      task.id
                    })">Delete</button>
                </div>
          `;
        }
      })
      .join(`<br>`)}
  `

  task_listElement.innerHTML = `${incompleteMarkup} ${completeMarkup}`;
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
  const task_date = document.getElementById("task-date").value;
  const task = {
    title: task_name,
    status: false,
    id: i++,
    date: task_date,
  };

  tasks.push(task);

  renderTasksMarkup();

  document.getElementById("add-task").value = "";
}
