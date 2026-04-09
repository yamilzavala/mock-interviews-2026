import React from 'react'

const TaskItem = React.memo(({ task, updateTask, removeTask }) => {
    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</p>
            <div>
                <button onClick={(e) => updateTask(task.id)}>Toggle</button>
                <button onClick={(e) => removeTask(task.id)}>Remove</button>
            </div>
        </div>
    )
})

export default TaskItem