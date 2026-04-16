🧪 PARTE 1 — React (nivel alto real)
🧩 Enunciado

👉 EditableList (inline editing)

Requisitos

Tenés una lista:

[
  { id: 1, text: "Task 1" },
  { id: 2, text: "Task 2" }
]
Funcionalidades
1️⃣ Edit inline
click en un item → se convierte en input
editar texto
enter → guardar
escape → cancelar
2️⃣ Solo un item editable a la vez
3️⃣ UX
foco automático al editar
no perder cambios accidentalmente
🧠 Condiciones importantes
no mutar estado
evitar re-renders innecesarios
manejar bien eventos de teclado
⭐ Bonus
persistir cambios (simulado)
optimizar con memo
🎤 Pregunta 1

👉 explicame:

qué estado usarías
cómo manejarías “editing mode”
cómo evitarías re-renders innecesarios
cómo manejarías enter / escape
cómo estructurarías componentes

----------------------------------------------------------------

💯 Respuesta ideal (nivel top)

I would manage state with items, editingId, and draftText.

When entering edit mode, I would set the editingId and initialize the draftText.

For saving, I would update the items immutably using map and reset the editing state.

For cancel, I would simply reset editingId and draftText.

I would handle Enter and Escape using onKeyDown on the input.

To avoid unnecessary re-renders, I would memoize the item component using React.memo and use useCallback for handlers.

I would also ensure the input is auto-focused when entering edit mode.

Structurally, I would have a parent list component and a child item component.