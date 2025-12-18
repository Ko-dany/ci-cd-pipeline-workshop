import { TodoList } from "./todo.js";
import "./style.css";

const todoList = new TodoList();

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const listElement = document.querySelector("#todo-list");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

function render() {
  let todos;

  switch (currentFilter) {
    case "active":
      todos = todoList.getActive();
      break;
    case "completed":
      todos = todoList.getCompleted();
      break;
    default:
      todos = todoList.getAll();
  }

  listElement.innerHTML = todos
    .map(
      (todo) => `
    <li class="todo-item ${todo.completed ? "completed" : ""}">
      <input 
        type="checkbox" 
        ${todo.completed ? "checked" : ""}
        data-id="${todo.id}"
        class="todo-checkbox"
      >
      <span class="todo-text">${todo.text}</span>
      <button class="delete-btn" data-id="${todo.id}">Delete</button>
    </li>
  `
    )
    .join("");

  updateStats();
}

function updateStats() {
  const active = todoList.getActive().length;
  const total = todoList.getAll().length;
  document.querySelector(
    "#stats"
  ).textContent = `${active} of ${total} tasks remaining`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();

  if (text) {
    todoList.add(text);
    input.value = "";
    render();
  }
});

listElement.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("delete-btn")) {
    todoList.remove(id);
    render();
  } else if (e.target.classList.contains("todo-checkbox")) {
    todoList.toggle(id);
    render();
  }
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
