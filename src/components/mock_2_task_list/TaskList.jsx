import React from 'react'
import TaskItem from './TaskItem'

const TaskList = ({ updateTask, removeTask, filteredTask }) => {
    return (
        <div>
            {filteredTask?.map(task => (
                <TaskItem key={task.id} updateTask={updateTask} removeTask={removeTask} task={task} />
            ))}
        </div>
    )
}

export default TaskList