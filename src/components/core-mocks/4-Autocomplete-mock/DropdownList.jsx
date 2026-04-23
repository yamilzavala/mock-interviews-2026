import React from 'react'
import OptionItem from './OptionItem'

const DropdownList = ({items, loading, onSelect, highlightedIndex}) => {

  if (loading) return <div>Loading...</div>
  if (!items?.length) return <div>No data</div>

  return (
    <ul>
      {items.map((item, idx) => (
        <OptionItem 
          key={idx}
          onSelect={onSelect}
          item={item}
          isHighligted={highlightedIndex === idx}
        />
      ))}
    </ul>
  )
}

export default React.memo(DropdownList)