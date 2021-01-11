//Get Global DOM elements
const form = document.querySelector('.task-field');
const clearTasksList = document.querySelector('.clear-items');
const deleteTaskItem = document.querySelector('.task-list');
const editTaskItem = document.querySelector('.task-list');

//Load all event listeners
loadEventListeners();

//Create Event listeners function

function loadEventListeners(){
  //Add  task to list
  form.addEventListener('submit', addItem);
  //Clear all tasks
  clearTasksList.addEventListener('click', clearItems);
  //Remove a task from list
  deleteTaskItem.addEventListener('click', deleteItem);
  //Edit a task item
  editTaskItem.addEventListener('click', editItem);
}

//Add task function
function addItem(e){
  //Get DOM elements
  const inputField = document.querySelector('.input-field');
  const taskList = document.querySelector('.task-list');
  const li = document.createElement('li');

  //Construct task item and append
  li.className = 'task-item';
  li.innerHTML = `<a href="#" class="task">${inputField.value}</a><i class="fas fa-edit"></i><i class="far fa-trash-alt"></i>`;
  taskList.appendChild(li);
  inputField.value = '';

  e.preventDefault();
}

//Clear tasks function
function clearItems(){
  const taskList = document.querySelector('.task-list');

  taskList.innerHTML = '';
}

//Delete task function
function deleteItem(e){
  if(e.target.classList.contains('fa-trash-alt')) {
    e.target.parentElement.remove();
  }
}

//Edit task function
function editItem(e){
  const inputField = document.querySelector('.input-field');
  if(e.target.classList.contains('fa-edit')) {
    inputField.value = e.target.previousElementSibling.textContent;
    (e.target.previousElementSibling.textContent);
    e.target.parentElement.remove();
  }
}