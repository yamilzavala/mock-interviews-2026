import React from 'react'

const OptionItem = ({ item, isHighlighted, onClick }) => {
  return (
    <li 
        onClick={onClick}
        style={{
            padding: "8px",
            cursor: "pointer",
            background: isHighlighted ? '#eee' : '#fff'
        }}
    >
        {item}
    </li>
  )
}

export default OptionItem