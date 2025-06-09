document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("input-text");
  const addbutton = document.getElementById("add-button");
  const itemList = document.getElementById("items");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((t) => renderTask(t));

  addbutton.addEventListener("click", () => {
    const tasktext = todoInput.value.trim();
    if (tasktext === "") {
      return;
    }

    const newtask = {
      id: Date.now(),
      text: tasktext,
      completed: false,
    };

    tasks.push(newtask);
    saveTask();
    renderTask(newtask);
    todoInput.value = ""; // clearing the input field when one task is added to the server
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement("li");

    if (task.completed) li.classList.add("complete");
    li.setAttribute("data-id", task.id);

    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevernt toggle from firing
      tasks = tasks.filter((t) => t.id != task.id);
      li.remove();
      saveTask();
    });

    itemList.appendChild(li);
  }

  //now methods to add the information to the local storage

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
