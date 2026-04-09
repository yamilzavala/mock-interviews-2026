🧪 PARTE 1 — React (NZ REAL)
🧩 Enunciado

👉 Optimistic Like Button (con rollback)

Escenario

Tenés un botón de “Like”:

muestra cantidad de likes
usuario puede likear / deslikear
API (simulada)
POST /like
POST /unlike
🎯 Requisitos
1️⃣ Optimistic UI

👉 cuando el usuario hace click:

actualizar UI inmediatamente
NO esperar respuesta del server
2️⃣ Rollback en error

👉 si la request falla:

revertir el estado anterior
mostrar error
3️⃣ Evitar múltiples clicks

👉 si el usuario hace spam click:

evitar inconsistencias
4️⃣ Estados
liked (boolean)
count (number)
loading / pending
error
⚠️ Escenario real (te presiono)

El entrevistador te dice:

“Sometimes the like count becomes inconsistent when users click very fast or when requests fail.”

🎤 Pregunta 1

👉 explicame:

cómo implementarías optimistic update
cómo harías rollback
cómo evitarías race conditions
cómo evitarías múltiples clicks inconsistentes
qué edge cases ves
⚠️ FOLLOW-UP

“What if the server responds out of order?”

-------------------------------------------

🎤 Respuesta senior — Optimistic Like Button

“I would implement this using an optimistic update approach to keep the UI responsive, while ensuring consistency with the server.

On user interaction, I would immediately update the UI — toggling the liked state and adjusting the count — without waiting for the server response. At the same time, I would store the previous state so I can rollback if the request fails.

To handle concurrency and avoid race conditions, I would assign a unique identifier to each request, typically using a ref. Every time the user clicks, I increment this identifier and associate the request with it.

When a response arrives, I would compare its identifier with the latest request. If it doesn’t match, I ignore it completely — both success and error — since it represents a stale response.

Only the latest request is allowed to modify the UI or trigger a rollback. This prevents issues where responses arrive out of order and corrupt the state.

For rollback, I would store a snapshot of the previous state per request, so that if the latest request fails, I can safely revert to the correct previous state.

I would also clean up any stored state after the request completes to avoid memory leaks.

From a UX perspective, I would allow rapid interactions instead of blocking clicks, but rely on the request tracking mechanism to ensure consistency.

If this were a real-world application, I would likely use a library like React Query to simplify mutation handling, optimistic updates, and cache synchronization.”