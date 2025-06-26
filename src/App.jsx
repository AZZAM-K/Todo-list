import { useState } from 'react'
import CreateNewTodo from './CreateNewTodo'
import TodoList from './TodoList'
import './style.css'
import sunIcon from './assets/icon-sun.svg'
import moonIcon from './assets/icon-moon.svg'

let nextId = 0
function App() {
  const [todos, setTodos] = useState([])
  const [theme, setTheme] = useState('dark')
  const handleCreate = newTodo => {
    if (isValidTodo(newTodo, todos)) {
      setTodos([...todos, { ...newTodo, id: nextId++ }])
    }
  }
  const handleCheck = itemId => {
    setTodos(
      todos.map(todo => {
        if (todo.id === itemId) {
          return { ...todo, completed: !todo.completed }
        } else {
          return todo
        }
      })
    )
  }
  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }
  const handleDelete = itemId => {
    setTodos(todos.filter(todo => todo.id != itemId))
  }
  const handleDragEnd = e => {
    const items = Array.from(todos)
    const [reorderedItem] = items.splice(e.dataTransfer.getData('index'), 1)
    items.splice(e.target.dataset.index, 0, reorderedItem)
    setTodos(items)
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index)
  }
  return (
    <main className={`main-${theme}`}>
      <div className='container'>
        <header>
          <span>todo</span>
          <button
            onClick={() =>
              theme === 'dark' ? setTheme('light') : setTheme('dark')
            }
          >
            <img
              src={theme === 'dark' ? sunIcon : moonIcon}
              alt={`${theme === 'dark' ? 'sun' : 'moon'} icon`}
            />
          </button>
        </header>
        <CreateNewTodo theme={theme} onCreate={handleCreate} />
        <TodoList
          todos={todos}
          onCheck={handleCheck}
          onClearCompleted={handleClearCompleted}
          onDelete={handleDelete}
          theme={theme}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      </div>
    </main>
  )
}
function isValidTodo(newTodo, todos) {
  if (!newTodo.task) {
    alert("Can't add empty todo!!!")
    return false
  }
  let isValid = true
  todos.forEach(todo => {
    if (todo.task === newTodo.task) {
      alert('Todo already exist!!!')
      isValid = false
    }
  })
  return isValid
}
export default App
