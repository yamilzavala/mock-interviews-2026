/**
 * 🧠 Reducer central:
 * Maneja TODAS las transiciones de estado
 */
export function undoRedoReducer(state, action) {
  const { past, present, future } = state;

  switch (action.type) {
    /**
     * 🔁 UNDO
     */
    case "UNDO": {
      // Edge case: no hay historial
      if (past.length === 0) return state;

      const previous = past[past.length - 1]; // último estado del pasado
      const newPast = past.slice(0, past.length - 1); // lo removemos

      return {
        past: newPast,
        present: previous,
        future: [present, ...future], // guardamos el actual en future
      };
    }

    /**
     * 🔁 REDO
     */
    case "REDO": {
      // Edge case: no hay futuro
      if (future.length === 0) return state;

      const next = future[0]; // próximo estado
      const newFuture = future.slice(1); // lo removemos

      return {
        past: [...past, present], // guardamos el actual en past
        present: next,
        future: newFuture,
      };
    }

    /**
     * ➕ Acción genérica (ADD / DELETE / EDIT)
     */
    case "SET": {
      const newPresent = action.payload;

      return {
        past: [...past, present], // guardamos el estado actual
        present: newPresent,
        future: [], // 💥 limpiamos future (clave)
      };
    }

    default:
      return state;
  }
}