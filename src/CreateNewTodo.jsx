import PropTypes from 'prop-types'
import { useState } from 'react'
import checkIcon from './assets/icon-check.svg'
function CreateNewTodo({ theme, onCreate }) {
  const [newTodo, setNewTodo] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  return (
    <div className={`input input-${theme}`}>
      <label htmlFor='newTodo' className={isCompleted ? 'checked' : ''}>
        {isCompleted && <img src={checkIcon} alt='check icon' />}
      </label>
      <input
        type='checkbox'
        checked={isCompleted}
        id='newTodo'
        onChange={e => {
          setIsCompleted(e.target.checked)
        }}
      />
      <input
        type='text'
        placeholder='Create a new todo...'
        value={newTodo}
        onChange={e => {
          setNewTodo(e.target.value)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onCreate({ task: newTodo, completed: isCompleted })
            setNewTodo('')
            setIsCompleted(false)
          }
        }}
      />
    </div>
  )
}
CreateNewTodo.propTypes = {
  theme: PropTypes.string,
  onCreate: PropTypes.func,
}
export default CreateNewTodo
