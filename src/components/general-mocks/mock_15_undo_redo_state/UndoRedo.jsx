import { useUndoRedo } from './useUndoRedo';

const UndoRedo = () => {
 const {
    present,
    set,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo([]);

  /**
   * ➕ Agregar item
   */
  const addItem = (item) => {
    set([...present, item]);
  };

  /**
   * ❌ Eliminar item
   */
  const deleteItem = (index) => {
    const newItems = present.filter((_, i) => i !== index);
    set(newItems);
  };

  /**
   * ✏️ Editar item
   */
  const editItem = (index, value) => {
    const newItems = [...present];
    newItems[index] = value;
    set(newItems);
  };

  return (
    <div>
      <button onClick={() => addItem("Item")} >Add</button>
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>

      <ul>
        {present.map((item, i) => (
          <li key={i}>
            {item}
            <button onClick={() => deleteItem(i)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UndoRedo