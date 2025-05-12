import { useState } from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
const btns = ['all', 'active', 'completed']
function TodoList({
  todos,
  theme,
  onCheck,
  onClearCompleted,
  onDelete,
  handleDragStart,
  handleDragEnd,
}) {
  const [status, setStatus] = useState('all')
  let items
  if (status === 'active') {
    items = todos.filter(todo => !todo.completed)
  } else if (status === 'completed') {
    items = todos.filter(todo => todo.completed)
  } else {
    items = [...todos]
  }
  const itemsLeft = todos.filter(todo => !todo.completed).length
  return (
    <div className={`list list-${theme}`}>
      <ul>
        {items.map((item, index) => {
          return (
            <Todo
              key={item.id}
              todo={item}
              theme={theme}
              onCheck={onCheck}
              onDelete={onDelete}
              handleDragEnd={handleDragEnd}
              handleDragStart={handleDragStart}
              itemIndex={index}
            />
          )
        })}
      </ul>
      <div className={`status status-${theme}`}>
        <span>{itemsLeft} items left</span>
        <div className='buttons'>
          {btns.map(btn => {
            return (
              <button
                key={btn}
                className={status === btn ? 'selected' : ''}
                onClick={() => setStatus(btn)}
              >
                {btn.charAt(0).toUpperCase() + btn.slice(1)}
              </button>
            )
          })}
        </div>
        <button onClick={onClearCompleted}>Clear Completed</button>
      </div>
    </div>
  )
}
TodoList.propTypes = {
  todos: PropTypes.array,
  theme: PropTypes.string,
  onCheck: PropTypes.func,
  onClearCompleted: PropTypes.func,
  onDelete: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleDragStart: PropTypes.func,
}
export default TodoList
