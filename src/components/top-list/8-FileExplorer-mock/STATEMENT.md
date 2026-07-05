🧪 PARTE 1 — React 
🧩 Enunciado
👉 File Explorer (Tree View)

🎯 Requisitos clave
renderizar estructura jerárquica (recursivo)
expand / collapse
ordenar:
folders primero
luego files
alfabéticamente
manejar estado de expansión

⚠️ Presión real
El entrevistador te dice:
“When the tree grows large, expanding nodes becomes slow and causes unnecessary re-renders.”

🎤 Pregunta
👉 explicame:
cómo estructurás el estado de expansión
cómo implementás la recursividad
cómo ordenás correctamente
cómo evitás re-renders innecesarios
cómo escalarías esto a miles de nodos

⚠️ FOLLOW-UP
“Would you store expansion state inside each node or separately?”

---------------------------------------------------------

💯 Versión ideal (nivel top candidate)
“I would store the expansion state using a Set of expanded node IDs for efficient lookup.

The tree would be rendered recursively, where each node renders its children only if it is expanded.

For sorting, I would separate folders and files, sort each group alphabetically, and then merge them.

To optimize performance, I would memoize node components and ensure stable props using useCallback.

For large trees, I would consider lazy loading children when expanding nodes and possibly virtualization to render only visible elements.”

 