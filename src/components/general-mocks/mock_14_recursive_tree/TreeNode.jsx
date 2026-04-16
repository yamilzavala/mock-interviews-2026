import React, { useMemo } from "react";

/**
 * 🔥 React.memo
 *
 * 👉 evita re-render si las props no cambian
 * 👉 clave para performance en árboles grandes
 */
const TreeNode = React.memo(function TreeNode({
  node,
  expanded,
  toggle,
  level
}) {
  /**
   * 🧠 Determinar tipo de nodo
   *
   * 👉 si tiene children → folder
   * 👉 si no → file
   */
  const isFolder = !!node.children;

  /**
   * 🧠 Saber si está expandido
   *
   * 👉 lookup O(1) en el Set
   */
  const isOpen = expanded.has(node.id);

  /**
   * 🔥 Ordenamiento optimizado
   *
   * 👉 useMemo para evitar recalcular en cada render
   * 👉 solo se recalcula si cambian los children
   *
   * Reglas:
   * 1. folders primero
   * 2. files después
   * 3. ambos ordenados alfabéticamente
   */
  const sortedChildren = useMemo(() => {
    if (!node.children) return [];

    const folders = [];
    const files = [];

    // 👉 separar en 2 grupos
    for (const child of node.children) {
      if (child.children) folders.push(child);
      else files.push(child);
    }

    // 👉 ordenar cada grupo
    folders.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));

    // 👉 combinar
    return [...folders, ...files];
  }, [node.children]);

  return (
    <div >
      {/*
        🔹 Render del nodo actual

        👉 si es folder:
        - se puede clickear
        - muestra icono abierto/cerrado

        👉 si es file:
        - no es interactivo
      */}
      <div
        onClick={() => {
          // 👉 solo folders reaccionan al click
          if (isFolder) toggle(node.id);
        }}
        style={{
          cursor: isFolder ? "pointer" : "default"
        }}
      >
        {/*
          📁 iconos simples para diferenciar
        */}
        {isFolder ? (isOpen ? "📂[-]" : "📁[+]") : "📄"} {node.name}
      </div>

      {/*
        🔥 Recursividad

        👉 SOLO renderizamos hijos si:
        - es folder
        - está expandido

        💡 Esto es clave para performance:
        evita renderizar todo el árbol innecesariamente
      */}
      {isFolder && isOpen && (
        <div>
          {sortedChildren.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              expanded={expanded}
              toggle={toggle}
              level={level + 1} // 👉 aumenta indentación
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default TreeNode;