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
I would store expansion state separately using a Set of expanded node IDs for O(1) operations.
Rendering would be recursive, where each node conditionally renders its children if it is expanded.
For sorting, I would separate directories and files, sort each group alphabetically, and then merge them.
To optimize performance, I would memoize node components and avoid unnecessary re-renders using stable props and callbacks.
For very large trees, I would consider virtualization to render only visible nodes.
This approach keeps the UI responsive and scalable.

 