import React from 'react'
import OptionItem from './OptionItem'

const DropdownList = ({
  items,
  loading,
  highlightedIndex,
  onSelect,
}) => {

  if(loading) return <div>Loading...</div>
  if(!items?.length) return <div>No results</div>

  return (
    <ul>
        {items?.map((item, idx) => {
            return (
                <OptionItem
                    key={idx}
                    item={item}
                    isHighlighted={idx === highlightedIndex}
                    onClick={() => onSelect(item)}
                />
            )
        })}
    </ul>
  )
}

export default DropdownList