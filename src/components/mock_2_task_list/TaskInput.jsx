import React from 'react'

const TaskInput = ({ text, setText, addTask }) => {
    return (
        <>
            <div>
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder='Task description'
                />
                <button onClick={addTask}>
                    Add task
                </button>
            </div>
        </>
    )
}

export default TaskInput