🧪 PARTE 1 — React (NZ-style real scenario)
🧩 Enunciado

👉 SearchableDropdown (Autocomplete)
Requisitos
Tenés que construir un componente que:
1️⃣ Input de búsqueda
el usuario escribe texto
se filtran opciones
2️⃣ Lista de resultados
mostrar coincidencias
máximo 5 resultados
3️⃣ Selección
click en opción → se selecciona
mostrar valor seleccionado
4️⃣ UX importante
cerrar dropdown al seleccionar
cerrar dropdown al hacer click afuera
manejar loading state (simulado o real)
🧠 Condiciones
evitar renders innecesarios
manejar bien eventos
no mutar estado
código limpio
⭐ Bonus
debounce
keyboard navigation (↑ ↓ enter)
🎤 Pregunta 1

👉 explicame:
qué estado usarías
cómo manejarías el open/close del dropdown
cómo implementarías el filtro
cómo evitarías re-renders innecesarios
cómo manejarías click outside

---------------------------------------------------------------


I would keep all state and logic in a container or custom hook
I would split UI into presentational components
DropdownList and OptionItem would be stateless
All interactions would be handled by callbacks from the parent

I handle keyboard navigation using onKeyDown
I prevent out-of-bounds using Math.min / Math.max or modulo
I guard against empty lists before applying logic
I select items using the highlighted index
I close the dropdown on selection or Escape

I would manage state for inputValue, isOpen, selectedValue, and highlightedIndex.
I would open the dropdown on input focus and close it on selection or when clicking outside.
For filtering, I would derive the filtered list based on the input value and limit the results to 5 items.
I would encapsulate the filtering and debounce logic inside a custom hook like useAutocomplete.
To handle click outside, I would use a ref and a mousedown listener to detect when the click is outside the component.
To avoid unnecessary re-renders, I would memoize the filtered list and use useCallback for handlers.