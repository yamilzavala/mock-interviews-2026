🧩 Enunciado
👉 Undo / Redo State (Time Travel UI)
Escenario

Tenés una app simple:
lista de items
podés:
agregar
eliminar
editar

🎯 Requisito clave
👉 implementar:
UNDO / REDO
Ejemplo
Add A → Add B → Delete A
UNDO → vuelve A
UNDO → elimina B
REDO → vuelve B

⚠️ Problema real
El interviewer te dice:
“State becomes inconsistent after multiple undo/redo operations.”

🎤 Pregunta
👉 explicame:
cómo estructurás el estado
cómo manejás history
cómo implementás undo / redo
cómo evitás inconsistencias
cómo optimizás memoria

⚠️ INTERRUPCIÓN
“Wait — are you storing full snapshots or diffs?”

⚠️ INTERRUPCIÓN 2
“What happens if the user performs a new action after undo?”

---------------------------------------------------------------------

💯 Versión ideal (nivel top candidate)
I would model the state using past, present, and future arrays.
Undo moves the current state to future and restores the last state from past.
Redo does the opposite.
When a new action is performed, I clear the future to avoid invalid redo states.
I would implement this using a reducer and expose it through a custom hook.
I would store full snapshots for simplicity, but for large datasets I could optimize using diffs or limit history size.
This ensures predictable and consistent state transitions.

---------------------------------------------------------------------

🧠 🎤 Cómo lo explicás en entrevista (esto vale oro)
“I model the state using past, present, and future stacks.
Undo moves the current state into future and restores from past.
Redo does the opposite.
Any new action clears the future stack to avoid inconsistent timelines.”

---------------------------------------------------------------------

🧠 🔥 Resumen definitivo
UNDO → reduce past, llena future
REDO → reduce future, llena past
NEW ACTION →
agrega a past
💥 limpia future
NO toca el resto de past

past = historial viejo
present = estado actual
future = posibles futuros

UNDO → necesita past
REDO → necesita future
NEW ACTION → limpia future

✔️ 2. Reglas de transición
UNDO:
present → future
past.pop() → present
REDO:
present → past
future.shift() → present
NEW ACTION:
present → past
💥 limpiar future