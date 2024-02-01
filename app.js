//create const for the document Todo Form
const newTaskForm = document.querySelector("#addToDoForm");
// create const for the empty unordered list where the ToDos will be added
const taskList = document.querySelector("#toDoList");



// create const that convert a string to an array for the todos or an empty array
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
//for loop to loop through the savedTodos Array
for (let i = 0; i < savedTodos.length; i++) {
  // create new variable that passes argument into createTaskElement function.
  let newTodo = createTaskElement(
  savedTodos[i].task, 
  savedTodos[i].checked);
  
  // if statement which helps to determine if the the lined object in savedTodos is lined-through.
  // if the statement is true, it adds the line-through to the spans class in newTodo
  if (savedTodos[i].lined === "line-through"){
    newTodo.querySelector(".spans").style.textDecoration = "line-through";
  }
  // add newTodo to the taskList
  taskList.appendChild(newTodo);
}

// perform an action when a new todo is submitted in the form
newTaskForm.addEventListener("submit", function (e) {
  // prevent the default submit behavior
  e.preventDefault();
  // create a const for text inputted on the form
  const taskValue = document.querySelector('#toDoInput').value;
  // create a variable to pass arguments into the createTaskElement fucntion
  // taskValue cont above and false boolean are passed as arguments
  const newTodo = createTaskElement(taskValue, false);
  // create a const to get the value of the checkbox on the todo
  const checkBox = newTodo.firstChild.checked;

  // if statement to determine if the form input is blank and only let user submit when it is not blank.
  if (taskValue !== ""){
    // add newTodo from the createTaskElement function to the taskList
    taskList.appendChild(newTodo);
    }
    // clear all values on the form
    newTaskForm.reset();
    // add input from the form and the checkbox status to the savedTodos array
    savedTodos.push({task: taskValue, checked: checkBox})
    // set the savedTodos as a JSON String
    localStorage.setItem("todos", JSON.stringify(savedTodos));
  })

// event for when an item is clicked such as the remove button or checkbox
taskList.addEventListener("click", function (e) {

  // if statement for when the target click has the class remove-button
  if (e.target.classList.contains("remove-button")) {
    // set const for the targets parent element
    const taskElement = e.target.parentElement;
    // set const for the parent elements children at index 2 - get inner text
    const taskText = taskElement.children[1].innerText;

    // Remove the toDo from the savedTodos array using a forEach loop
    savedTodos.forEach((todo, index) => {
      // if statement for when savedToDo array element matches the const taskText
      if (todo.task === taskText) {
          //remove element from savedArray at index# and then send updated savedTodos to localStorage
          savedTodos.splice(index, 1);
          localStorage.setItem("todos", JSON.stringify(savedTodos));
      }
          // Delete Todo from the DOM
          taskElement.remove();
    });

    }
    // If statement for the checkboxes
    if (e.target.classList.contains("checkComplete")) {
      // const for parent of checkbox clicked
      const taskContainer = e.target.parentElement;
      // const for span of checkbox clicked
      const span = taskContainer.querySelector(".spans");
      // get value of checkbox
      const taskChecked = taskContainer.children[0].checked;
      
      // if target is checked, put a line through the span/text, else no line
      if (e.target.checked) {
        span.style.textDecoration = "line-through";
      } 
      else {
        span.style.textDecoration = "none";
      }
  
      // Use forEach statement to update the savedTodos array with values for the checkbox status and span 
      // line-through status 
      savedTodos.forEach((todo, index) => {
        if (todo.task === span.innerText){
          // at savedTodos index checkbox status should equal current checked status
          savedTodos[index].checked = taskChecked;
          // at savedTodos index line-through status should equal taskChecked status conditional
          savedTodos[index].lined = taskChecked ? "line-through" : "none";
          // send updates on checkbox and line-through to local storage
          localStorage.setItem("todos", JSON.stringify(savedTodos));
        }
      });
  }

});

// a fucntion to create a li that holds a span with text, a checkbox, and remove buttton
function createTaskElement(taskValue, checked) {
  // create a span, use input from form as the innerText of span, add class
  const span = document.createElement('span');
  span.innerText = taskValue;
  span.classList.add('spans');

  // create input element, set attribute to checkbox, add a class, set status of checkbox
  const completeCheckBox = document.createElement("input")
  completeCheckBox.setAttribute("type", "checkbox");
  completeCheckBox.classList.add("checkComplete")
  completeCheckBox.checked = checked;

  // create a button to remove todos, and add class
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.classList.add("remove-button");

  // create an li to go in the ul
  const newTodo = document.createElement("li");

  // append all elements to the li and return the li
  newTodo.appendChild(completeCheckBox);
  newTodo.appendChild(span);
  newTodo.appendChild(removeButton);
  return newTodo;
}