import React from 'react'

const OptionItem = ({
  item,
  isHighlighted,
  onSelect,
}) => {
  return (
    <li
      onClick={() => onSelect(item)}
      style={{
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: isHighlighted ? '#ddd' : '#fff',
        borderBottom: '1px solid #eee',
      }}
    >
      <div>{item.name}</div>

      <small>{item.email}</small>
    </li>
  )
}

export default React.memo(OptionItem)