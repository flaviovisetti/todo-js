const fetchLocalStorage = function() {
  const dataStorage = localStorage.getItem('todos')
  if(dataStorage !== null) {
    return JSON.parse(dataStorage)
  } else {
    return []
  }
}

const saveLocalStorage = function(todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const createElementTodo = function(todo) {
  const divElement = document.createElement('div')
  const checkElement = document.createElement('input')
  const anchorElement = document.createElement('a')
  const deleteElement = document.createElement('button')
  checkElement.setAttribute('type', 'checkbox')
  anchorElement.setAttribute('href', `/edit.html#${todo.id}`)
  deleteElement.textContent = 'delete'

  divElement.appendChild(checkElement)
  divElement.appendChild(anchorElement)
  divElement.appendChild(deleteElement)

  deleteElement.addEventListener('click', function(){
    removeTodoItem(todo.id)
    renderTodos()
  })

  checkElement.addEventListener('change', function() {
    todo.completed = !todo.completed
    saveLocalStorage(todos)
    renderTodos()
  })

  if (todo.completed) {
    checkElement.checked = true
  }

  if (todo.text.length > 0) {
    anchorElement.textContent = todo.text
  } else {
    anchorElement.textContent = 'Unnamed TODO'
  }

  document.querySelector('#search-area').appendChild(divElement)
}

const removeTodoItem = function(todoId) {
  const selectedElement = todos.findIndex(function(todo){
    return todo.id === todoId
  })

  todos.splice(selectedElement, 1)
  saveLocalStorage(todos)
}

const createSubTitleTodo = function(pendingTodos) {
  const h2Element = document.createElement('h2')
  h2Element.textContent = `You have ${pendingTodos.length} TODOs left.`
  document.querySelector('#search-area').appendChild(h2Element)
}

const filterByWord = function(todos, search) {
  return todos.filter(function(todo) {
    if(search.text !== undefined)
    return todo.text.toLowerCase().includes(search.text.toLowerCase())
  })
}

const filterByHideCompleted = function(todos, search) {
  return todos.filter(function(todo) {
    if (search.completed) {
      return !todo.completed
    } else {
      return todo
    }
  })
}

const filterPendings = function(todos) {
  return todos.filter(function(todo) {
    return !todo.completed
  })
}

const renderTodos = function() {
  document.querySelector('#search-area').innerHTML = ''
  const stepOneFilter = filterByWord(todos, searchText)
  let stepTwoFilter

  if (stepOneFilter.length > 0) {
    stepTwoFilter = filterByHideCompleted(stepOneFilter, searchText)
  } else {
    stepTwoFilter = filterByHideCompleted(todos, searchText)
  }

  createSubTitleTodo(filterPendings(stepTwoFilter))

  stepTwoFilter.forEach(function(todo){
    createElementTodo(todo)
  })
}
