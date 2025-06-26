import PropTypes from 'prop-types'
import checkIcon from './assets/icon-check.svg'
import deleteIcon from './assets/icon-cross.svg'

function Todo({
  todo,
  theme,
  onCheck,
  onDelete,
  handleDragStart,
  handleDragEnd,
  itemIndex,
}) {
  return (
    <>
      <li
        className={`todo todo-${theme}`}
        draggable
        onDragStart={e => handleDragStart(e, itemIndex)}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDragEnd}
        data-index={itemIndex}
      >
        <div className='task-name'>
          <label
            htmlFor={`todo-${todo.id}`}
            className={todo.completed ? 'checked' : ''}
          >
            {todo.completed && <img src={checkIcon} alt='Check icon' />}
          </label>
          <input
            type='checkbox'
            checked={todo.completed}
            id={`todo-${todo.id}`}
            onChange={() => onCheck(todo.id)}
          />
          <span className={todo.completed ? 'completed' : ''}>{todo.task}</span>
        </div>
        <button onClick={() => onDelete(todo.id)}>
          <img src={deleteIcon} alt='Delete icon' />
        </button>
      </li>
      <hr />
    </>
  )
}
Todo.propTypes = {
  todo: PropTypes.object,
  theme: PropTypes.string,
  onCheck: PropTypes.func,
  onDelete: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleDragStart: PropTypes.func,
  itemIndex: PropTypes.number,
}
export default Todo
