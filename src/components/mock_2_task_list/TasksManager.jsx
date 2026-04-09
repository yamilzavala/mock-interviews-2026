import { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import TaskInput from './TaskInput';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';

const defaultTask = {
  id: Date.now(),
  text: 'task 1',
  completed: true
}

const getFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [defaultTask]
  } catch {
    return [defaultTask]
  }
}

const saveInLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      if (!action.payload.text.trim()) return state;
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload.text,
          completed: false,
        }
      ]

    case 'TOGGLE':
      return state.map(task => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task
      })

    case 'REMOVE':
      return state.filter(task => task.id !== action.payload.id)

    default:
      return state;
  }
}

const TasksManager = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, [], getFromLocalStorage)
  const [filter, setFilter] = useState('all')
  const [text, setText] = useState('')

  const removeTask = useCallback((id) => {
    dispatch({ type: 'REMOVE', payload: { id } })
  }, [])

  const updateTask = useCallback((id) => {
    dispatch({ type: 'TOGGLE', payload: { id } })
  }, [])

  const addTask = useCallback(() => {
    dispatch({ type: 'ADD', payload: { text } })
    setText('')
  }, [text])

  const filteredTask = useMemo(() =>
    tasks.filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    }),
    [tasks, filter]);

  useEffect(() => {
    saveInLocalStorage(tasks)
  }, [tasks])

  return (
    <section>
      {tasks.length < 1 && (
        <p>No tasks available</p>
      )}

      <TaskInput text={text} setText={setText} addTask={addTask} />
      <TaskFilter filter={filter} setFilter={setFilter} />

      <div>
        <TaskList filteredTask={filteredTask} removeTask={removeTask} updateTask={updateTask} />
      </div>
    </section>
  )
}

export default TasksManager