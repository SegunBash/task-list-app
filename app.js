//Get Global DOM elements
const form = document.querySelector('.task-field');
const clearTasksList = document.querySelector('.clear-items');
const deleteTaskItem = document.querySelector('.task-list');
const editTaskItem = document.querySelector('.task-list');
const inputField = document.querySelector('.input-field');
const taskList = document.querySelector('.task-list');

//Load all event listeners
loadEventListeners();

//Create Event listeners function
function loadEventListeners(){
  //Persist tasks to DOM
  document.addEventListener('DOMContentLoaded', getTasks)
  //Add  task to list
  form.addEventListener('submit', addItem);
  //Clear all tasks
  clearTasksList.addEventListener('click', clearItems);
  //Remove a task from list
  deleteTaskItem.addEventListener('click', deleteItem);
  //Edit a task item
  editTaskItem.addEventListener('click', editItem);
}

//Get tasks from local storage
function getTasks(){
  //Initialize a variable to store the tasks  
  let tasks;
  //Make sure local storage is empty, then pass the items inside local storage into the tasks variable as a string
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    //Construct task item 
    const li = document.createElement('li');
    //Append to task list
    li.className = 'task-item';
    li.innerHTML = `<a href="#" class="task">${task}</a><i class="fas fa-edit"></i><i class="far fa-trash-alt"></i>`;
    taskList.appendChild(li);
  })
}

//Add task function
function addItem(e){

  if(inputField.value!= ''){
  const li = document.createElement('li');

  //Construct task item and append
  li.className = 'task-item';
  li.innerHTML = `<a href="#" class="task">${inputField.value}</a><i class="fas fa-edit"></i><i class="far fa-trash-alt"></i>`;
  taskList.appendChild(li);
  //Call the store task in local storage function
  storeTaskInLocalStorage(inputField.value);
  //Clear input field
  inputField.value = '';
}else {
  showError('Please enter a task');
}

  e.preventDefault();
}

//Clear tasks function
function clearItems(){
  
  taskList.innerHTML = '';

  localStorage.clear();

}

//Store task in local storage
function storeTaskInLocalStorage(task) {
  //Initialize a variable to store the tasks  
  let tasks;
  //Make sure local storage is empty, then pass the items inside local storage into the tasks variable as a string
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // Push the tasks from input form into the tasks variable
  tasks.push(task);
  // Set the contents of the task variable to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Delete task function
function deleteItem(e){
  if(e.target.classList.contains('fa-trash-alt')) {
    e.target.parentElement.remove();

    deleteTaskFromLocalStorage(e.target.parentElement);
  }
}

//Edit task function
function editItem(e){
  
  if(e.target.classList.contains('fa-edit')) {
    inputField.value = e.target.previousElementSibling.textContent;
    (e.target.previousElementSibling.textContent);
    e.target.parentElement.remove();

    deleteTaskFromLocalStorage(e.target.parentElement);
  }
}

//Delete task from local storage
function deleteTaskFromLocalStorage(taskItem){
  //Initialize a variable to store the tasks  
  let tasks;
  //Make sure local storage is empty, then pass the items inside local storage into the tasks variable as a string
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}



//Display Error
function showError(err) {
  //Get DOM elements
  const card = document.querySelector('.container');
  const heading = document.querySelector('h2');

  //Create a div
  const errorDiv = document.createElement('div');
  //Add a class
  errorDiv.className = 'danger-alert';
  //Create error message and append to div
  errorDiv.appendChild(document.createTextNode(err));
  //Insert error Div into the DOM
  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

//Clear error after 3secs
function clearError(){
  document.querySelector('.danger-alert').remove();
}