🧪 PARTE 1 — React
🧩 Enunciado

👉 Multi-Select Dropdown with Async Search

Escenario

Tenés que construir un componente tipo:

Select users...
🎯 Requisitos
1️⃣ Async search
usuario escribe
se hace fetch a API
mostrar resultados
2️⃣ Multi-select
puede seleccionar múltiples opciones
mostrar seleccionados como “tags”
3️⃣ Remove selection
cada tag tiene “x”
se puede remover
4️⃣ UX importante
debounce en búsqueda
loading state
error state
cerrar dropdown al click afuera
⚠️ Escenario real (te presiono)

El entrevistador te dice:

“When users type fast, we see too many requests and inconsistent results.”

🎤 Pregunta

👉 explicame:

cómo estructurarías el estado
cómo manejarías el async search
cómo evitarías race conditions
cómo manejarías el debounce
cómo evitarías re-renders innecesarios
⚠️ FOLLOW-UP

“What happens if a user selects an option that disappears from the search results?”


------------------------------------------------------------------------------------------

💯 Versión ideal (nivel top candidate)

I would manage state for inputValue, selectedValues, isOpen, results, loading, and error.

For async search, I would debounce the input and trigger the fetch only when the debounced value changes.

To avoid race conditions, I would use an AbortController to cancel previous requests.

I would also cache results by query to prevent unnecessary requests.

Selected items would be stored separately so they remain visible even if they are not part of the current search results.

To optimize performance, I would memoize derived data and components, and avoid unnecessary state updates.

I would also handle UX concerns like click outside and loading states.