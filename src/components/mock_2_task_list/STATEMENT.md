🧪 PARTE 1 — React práctico (nuevo)
🧩 Enunciado

Tenés que construir un componente:

👉 TaskManager

Requisitos
Mostrar una lista de tareas:
[
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Prepare interview", completed: true }
]
Funcionalidades obligatorias
1️⃣ Agregar tarea
input + botón
no permitir strings vacíos
2️⃣ Marcar como completada
toggle completed
3️⃣ Filtro

Mostrar:

All
Completed
Pending
4️⃣ Eliminar tarea
🧠 Comportamiento esperado
no mutar el estado directamente
manejar correctamente re-renders
mantener código simple
⭐ Bonus (si llegás)
persistir en localStorage
optimizar renders
🎤 Pregunta 1

Antes de codear:

👉 explicame:

qué estado usarías
cómo estructurarías el componente
cómo manejarías las acciones (add / toggle / delete)
si usarías useReducer o useState y por qué

---------------------------------------------------------

💯 Respuesta ideal (nivel senior)

I see two possible approaches.

For a simple implementation, I could use useState with separate functions for add, toggle, and delete.

However, since we have multiple related actions, I would prefer using useReducer to centralize the logic.

The state would be an array of tasks with id, text, and completed properties.

I would define actions like ADD, TOGGLE, and REMOVE, and handle them inside the reducer.

I would also persist the tasks in localStorage using useEffect.

For structure, I would split the UI into smaller components like TaskInput, TaskList, and TaskItem to keep responsibilities separated.