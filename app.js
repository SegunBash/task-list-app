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
  if(inputField.value!= ''){
  const li = document.createElement('li');

  //Construct task item and append
  li.className = 'task-item';
  li.innerHTML = `<a href="#" class="task">${inputField.value}</a><i class="fas fa-edit"></i><i class="far fa-trash-alt"></i>`;
  taskList.appendChild(li);
  inputField.value = '';
}else {
  showError('Please enter a task');
}

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