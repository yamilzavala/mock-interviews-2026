import React from 'react'

const OptionItem = ({item, isHighligted, onSelect}) => {
  return (
    <li
      onClick={() => onSelect(item)}
      style={{backgroundColor: isHighligted ? '#ccc' : '', padding: '8px'}}
    >
      {item}
    </li>
  )
}

export default React.memo(OptionItem)