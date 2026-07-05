import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import DropdownList from './DropdownList'
import useAutocomplete from './useAutocomplete'

const Autocomplete = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [inputValue, setInputValue] = useState('')

  const [highlightedIndex, setHighlightedIndex] =
    useState(-1)

  const wrapperRef = useRef(null)

  const {
    results,
    loading,
    error,
  } = useAutocomplete(inputValue)

  const handleSelect = useCallback((user) => {
    setInputValue(user.name)
    setHighlightedIndex(-1)
    setIsOpen(false)
  }, [])

  const handleKeyDown = useCallback(
    (e) => {
      const navigationKeys = [
        'ArrowUp',
        'ArrowDown',
        'Enter',
        'Escape',
      ]

      if (!navigationKeys.includes(e.key)) return

      if (e.key === 'Escape') {
        setIsOpen(false)
        return
      }

      if (!results.length) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()

          setHighlightedIndex((prev) =>
            Math.min(prev + 1, results.length - 1)
          )

          break

        case 'ArrowUp':
          e.preventDefault()

          setHighlightedIndex((prev) =>
            Math.max(prev - 1, 0)
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
    [results, highlightedIndex, handleSelect]
  )

  // click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside,
      true
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
        true
      )
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '350px',
        position: 'relative',
      }}
    >
      <input
        value={inputValue}
        placeholder="Search users..."
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setInputValue(e.target.value)
          setIsOpen(true)
        }}
        style={{
          width: '100%',
          padding: '10px',
        }}
      />

      {isOpen && (
        <DropdownList
          items={results}
          loading={loading}
          error={error}
          onSelect={handleSelect}
          highlightedIndex={highlightedIndex}
        />
      )}
    </div>
  )
}

export default Autocomplete