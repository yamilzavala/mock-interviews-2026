import React from 'react'

const TaskFilter = ({ filter, setFilter }) => {
    return (
        <>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option value='all'>all</option>
                <option value='pending'>pending</option>
                <option value='completed'>completed</option>
            </select>
        </>
    )
}

export default TaskFilter