import React, {useState, useCallback} from 'react'
import EditableItem from './EditableItem';

const initialData = [
  { id: 1, text: "Task 1" },
  { id: 2, text: "Task 2" }
];

const EditableList = () => {
  const [items, setItems] = useState(initialData)
  const [editingId, setEditingId] = useState(null)
  const [draftText, setDraftText] = useState('')

   // 👉 iniciar edición
   const handleStartEdit = useCallback((id, text) => {
        setEditingId(id)
        setDraftText(text)
   }, [])

   // 👉 cambiar texto mientras escribe
   const handleChange = useCallback((value) => {
        setDraftText(value)
   }, [])

   // 👉 guardar
   const handleSave = useCallback(() => {
        setItems(prev => {
            return prev.map(item => {
                if(item.id === editingId) {
                    return {
                        ...item,
                        text: draftText
                    }
                }
                return item;
            })
        })
        setDraftText('')
        setEditingId(null)
   }, [draftText, editingId])

   // 👉 cancelar
   const handleCancel = useCallback(() => {
        setDraftText('')
        setEditingId(null)
   }, [])

  return (
    <div>
        {items.map(item => (
            <EditableItem 
                key={item.id}
                item={item}
                isEditing={editingId === item.id} 
                draftText={draftText}
                onSave={handleSave}
                onCancel={handleCancel}
                onStartEdit={handleStartEdit}
                onChange={handleChange}
            />
        ))}
    </div>
  )
}

export default EditableList