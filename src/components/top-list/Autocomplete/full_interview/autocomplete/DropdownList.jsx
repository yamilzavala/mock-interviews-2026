import React from 'react'
import OptionItem from './OptionItem'

const DropdownList = ({
  items,
  loading,
  error,
  onSelect,
  highlightedIndex,
}) => {
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!items.length) {
    return <div>No users found</div>
  }

  return (
    <ul
      style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        border: '1px solid #ccc',
      }}
    >
      {items.map((item, idx) => (
        <OptionItem
          key={item.id}
          item={item}
          onSelect={onSelect}
          isHighlighted={highlightedIndex === idx}
        />
      ))}
    </ul>
  )
}

export default React.memo(DropdownList)