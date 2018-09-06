let todos = fetchLocalStorage()

const searchText = {
  search: '',
  completed: false
}

renderTodos()

document.querySelector('#search-field').addEventListener('input', function(e){
  searchText.text = e.target.value
  renderTodos()
})

document.querySelector('#form-create').addEventListener('submit', function(e){
  e.preventDefault()
  todos.push({
    id: uuidv4(),
    text: e.target.elements.todoText.value,
    completed: e.target.elements.completedItem.checked
  })

  e.target.elements.todoText.value = ''
  e.target.elements.completedItem.checked = false

  saveLocalStorage(todos)
  renderTodos()
})

document.querySelector('#hide-completed').addEventListener('change', function(e){
  searchText.text = ''
  searchText.completed = e.target.checked
  renderTodos()
})

window.addEventListener('storage', function(e) {
  if(e.key === 'todos') {
    todos = JSON.parse(e.newValue)
    saveLocalStorage(todos)
    renderTodos()
  }
})
