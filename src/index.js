// Challenges
// - Add a search bar to look for todos with some specific text
// - Add tags to the todos
//     - User can see all existing tags, dynamically generated
//     - You can filter todos by tags, selecting multiple if needed
// - Add multiple users:
//     - You can select which user a todo belongs to
//     - You can filter the todos by user
// - Google up localStorage, how can you use it to make it so you don't lose your data when you refresh the app?

// A user can:
// - View incomplete todos
// - When the "Show completed todos" box is checked, view completed todos as well
// - Enter a new todo, which will initially show as incomplete
// - Click a todo to toggle its completion

// Instructions
// - Start this project from scratch, write whatever HTML, CSS & JS you need
// - Create a state object
// - Create action functions that update state
// - Create render functions that read from state

// Tips
// - Try starting with state. Create the state for the todos, then a function to toggle a todo's completed state, a function to add a new todo, etc.
// - You can test these functions before you even render anything on the page, just by calling the functions in your js file.

let mainSection = document.querySelector(".main-section");

function getCompletedTodos() {
  return state.todos.filter((todo) => todo.completed);
}

function getIncompletedTodos() {
  return state.todos.filter((todo) => !todo.completed);
}

let state = {
  todos: [
    { text: "Learn React", completed: false },
    { text: "Learn Node", completed: false },
    { text: "Learn Express", completed: false },
    { text: "Learn MongoDB", completed: false },
  ],
  showCompleted: true,
};

function renderOptionsSection() {
  let optionsSection = document.createElement("section");
  optionsSection.className = "options-section";

  let optionsTitle = document.createElement("h2");
  optionsTitle.className = "title";
  optionsTitle.textContent = "OPTIONS";

  let showCompletedTodosLabel = document.createElement("label");
  showCompletedTodosLabel.textContent = "Show completed ";

  let showCompletedTodosCheckbox = document.createElement("input");
  showCompletedTodosCheckbox.type = "checkbox";
  if (state.showCompleted) showCompletedTodosCheckbox.checked = true;
  showCompletedTodosCheckbox.addEventListener("click", function () {
    state.showCompleted = !state.showCompleted;
    render();
  });

  showCompletedTodosLabel.appendChild(showCompletedTodosCheckbox);
  optionsSection.append(optionsTitle, showCompletedTodosLabel);
  mainSection.append(optionsSection);
}

function renderAddTodoSection() {
  let addTodoSection = document.createElement("section");
  addTodoSection.className = "add-item-section";

  let addTodoTitle = document.createElement("h2");
  addTodoTitle.className = "title";
  addTodoTitle.textContent = "ADD ITEM";

  let formEl = document.createElement("form");
  formEl.className = "add-item";

  let inputTodo = document.createElement("input");
  inputTodo.className = "text-input";
  inputTodo.type = "text";
  inputTodo.name = "text";
  inputTodo.required = true;
  inputTodo.minLength = 3;

  let submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add";

  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo(inputTodo.value);
    inputTodo.value = "";
    render();
  });

  formEl.append(inputTodo, submitBtn);
  addTodoSection.append(addTodoTitle, formEl);

  mainSection.append(addTodoSection);
}

function renderTodosSection() {
  let todosSection = document.createElement("section");
  todosSection.className = "todos-section";

  let todosTitle = document.createElement("h2");
  todosTitle.className = "title";
  todosTitle.textContent = "TODO";

  let todosList = document.createElement("ul");
  todosList.className = "todo-list";

  //... Here must go the function to render the todos li elements

  todosSection.append(todosTitle, todosList);
  mainSection.append(todosSection);
}

function renderCompletedTodosSection() {
  let completedTodosSection = document.createElement("section");
  completedTodosSection.className = "completed-todos-section";

  let completedTodosTitle = document.createElement("h2");
  completedTodosTitle.className = "title";
  completedTodosTitle.textContent = "COMPLETED";

  let completedTodosList = document.createElement("ul");
  completedTodosList.className = "completed-list";

  //... Here must go the function to render the completed todos li elements

  completedTodosSection.append(completedTodosTitle, completedTodosList);
  mainSection.append(completedTodosSection);
}

function showCompletedTodos() {
  render();
}

function addTodo(todoText) {
  let todoMatch = state.todos.some((todo) => todo.text === todoText);

  if (todoMatch) return;

  // @ts-ignore
  state.todos.push({ todoText, completed: false });
}

{
  /* 

<section class="completed-todos-section">
<h2 class="title">COMPLETED</h2>
<ul class="completed-list">
  <li class="todo completed">
    <div class="completed-section">
      <input class="completed-checkbox" type="checkbox" />
    </div>
    <div class="text-section">
      <p class="text">See the doctor</p>
    </div>
    <div class="button-section">
      <button class="delete">Delete</button>
    </div>
  </li>
</ul>
</section>



<section class="todos-section">
<h2 class="title">TODO</h2>
<ul class="todo-list">
  <li class="todo">
    <div class="completed-section">
      <input class="completed-checkbox" type="checkbox" />
    </div>
    <div class="text-section">
      <p class="text">Go shopping</p>
    </div>
    <div class="button-section">
      <button class="delete">Delete</button>
    </div>
  </li>
</ul>
</section>
 */
}

function render() {
  mainSection.textContent = "";
  mainSection.className = "main-section";

  renderOptionsSection();
  renderAddTodoSection();
  renderTodosSection();
  renderCompletedTodosSection();
}
