import { useState, useCallback } from "react";
import TreeNode from "./TreeNode";

export default function FileExplorer({ data }) {
  /**
   * 🧠 Estado de expansión
   *
   * 👉 Usamos un Set porque:
   * - lookup O(1): expanded.has(id)
   * - agregar / eliminar rápido
   * - no necesitamos estructura compleja
   *
   * 👉 IMPORTANTE:
   * Este estado está separado del árbol (data)
   * → no mutamos la data original
   */
  const [expanded, setExpanded] = useState(() => new Set());

  /**
   * 🔥 toggle de un nodo
   *
   * 👉 useCallback para mantener referencia estable
   * → evita re-renders innecesarios en hijos (React.memo)
   *
   * 👉 lógica:
   * - copiamos el Set anterior (inmutabilidad)
   * - si el id ya existe → lo eliminamos (collapse)
   * - si no existe → lo agregamos (expand)
   */
  const toggle = useCallback((id) => {
    setExpanded(prev => {
      const next = new Set(prev); // ⚠️ nunca mutar el original

      if (next.has(id)) {
        next.delete(id); // collapse
      } else {
        next.add(id); // expand
      }

      return next;
    });
  }, []);

  return (
    <div>
      {/* 
        🔁 Render inicial del árbol
        👉 iteramos el nivel raíz
        👉 cada nodo se renderiza con TreeNode
      */}
      {data.map(node => (
        <TreeNode
          key={node.id}
          node={node}
          expanded={expanded}
          toggle={toggle}
          level={0} // 👉 nivel para indentación
        />
      ))}
    </div>
  );
}