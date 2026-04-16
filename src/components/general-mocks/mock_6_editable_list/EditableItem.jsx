import {useState, memo, useCallback, useRef, useEffect} from 'react'

const EditableItem = ({
  item,
  isEditing,
  draftText,
  onStartEdit,
  onChange,
  onSave,
  onCancel
}) => {
  const inputRef = useRef(null)

  // focus
  useEffect(() => {
    if(isEditing) {
        inputRef.current.focus()
    }
  }, [isEditing])  

  // click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
        if(!inputRef.current.contains(e.target)) {
            onCancel()
        }
    }

    if(isEditing) {
        document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isEditing, onCancel])

  const handleOnKeyDown = useCallback((e) => {
    if(e.key === 'Enter') {
        onSave()
    }
    if(e.key === 'Escape') {
        onCancel()
    }

  }, [onCancel, onSave])

  if(isEditing) return (
    <input 
        type='text'
        ref={inputRef}
        value={draftText}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleOnKeyDown}
    />
  ) 

  return (
    <div onClick={() => onStartEdit(item.id, item.text)}>
        {item.text}
    </div>
  )
}

export default memo(EditableItem)