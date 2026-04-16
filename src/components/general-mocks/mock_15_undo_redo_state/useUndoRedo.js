import { useReducer, useCallback } from "react";
import { undoRedoReducer } from "./reducer";

/**
 * 🧠 Estado base:
 * - past: historial hacia atrás
 * - present: estado actual
 * - future: historial hacia adelante (redo)
 */
const initialState = {
  past: [],
  present: [],
  future: [],
};

export function useUndoRedo(initialPresent = []) {
  const [state, dispatch] = useReducer(undoRedoReducer, {
    ...initialState,
    present: initialPresent,
  });

  /**
   * 🔁 Undo
   */
  const undo = useCallback(() => {
    dispatch({ type: "UNDO" });
  }, []);

  /**
   * 🔁 Redo
   */
  const redo = useCallback(() => {
    dispatch({ type: "REDO" });
  }, []);

  /**
   * 🧠 Setter genérico
   * 👉 permite agregar, eliminar, editar
   */
  const set = useCallback((newState) => {
    dispatch({ type: "SET", payload: newState });
  }, []);

  return {
    ...state,
    undo,
    redo,
    set,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
}