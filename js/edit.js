const hashTodoId = location.hash.substring(1)
let todos = fetchLocalStorage()

let foundTodo = todos.find(function(todo) {
  return todo.id === hashTodoId
})

if(foundTodo === undefined) {
  location.assign('/index.html')
}

const textElement = document.querySelector('#text-edit')
textElement.value = foundTodo.text

textElement.addEventListener('input', function(e){
  foundTodo.text = e.target.value
  saveLocalStorage(todos)
})

window.addEventListener('storage', function(e){
  if(e.key === 'todos') {
    todos = JSON.parse(e.newValue)
    foundTodo = todos.find(function(todo) {
      return todo.id === hashTodoId
    })

    if(foundTodo === undefined)
      location.assign('/index.html')

    textElement.value = foundTodo.text
  }
})
