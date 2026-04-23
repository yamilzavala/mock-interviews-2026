import React, {useState, useCallback, useRef, useEffect} from 'react'
import DropdownList from './DropdownList'
import useAutocomplete from './useAutocomplete'

//mock fn
const mockFn = async (query, signal) => {
  const values = ['apple', 'oranges', 'grapes', 'strawberries', 'bananas']

  await new Promise((res) => setTimeout(res, 500))

  if (signal.aborted) {
    return []
  }

  return values
    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5)
}

const Autocomplete = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const {results, loading} = useAutocomplete(mockFn, inputValue)

  const wrapperRef = useRef(null)

  const handleSelect = useCallback((item) => {
    setInputValue(item)
    setHighlightedIndex(-1)
    setIsOpen(false)
  }, [])

  const handleKeyDown = useCallback(
    (e) => {
      const navKeys = ['ArrowUp', 'ArrowDown', 'Enter', 'Escape']
      if (!navKeys.includes(e.key)) return

      if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
        return
      }

      if (!isOpen || results.length < 1) return

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex((prev) => Math.max(prev - 1, 0))
          break
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex((prev) =>
            Math.min(prev + 1, results.length - 1)
          )
          break
        case 'Enter':
          e.preventDefault()
          if (highlightedIndex >= 0) {
            handleSelect(results[highlightedIndex])
          }
          break
        default:
          break
      }
    },
    [isOpen, results, highlightedIndex, handleSelect]
  )

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside, true)
    return () =>
      document.removeEventListener('mousedown', handleClickOutside, true)
  }, [])

  return (
    <div ref={wrapperRef} style={{width: '300px'}}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        style={{padding: '8px', width: '100%'}}
      />

      {isOpen && (
        <DropdownList
          items={results}
          loading={loading}
          onSelect={handleSelect}
          highlightedIndex={highlightedIndex}
        />
      )}
    </div>
  )
}

export default Autocomplete
