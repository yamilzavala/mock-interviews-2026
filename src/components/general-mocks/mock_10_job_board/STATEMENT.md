🧩 Enunciado (tu ejercicio)

👉 Job Board con Hacker News API

🎤 Pregunta 1 (como entrevistador)

👉 Explicame:

cómo estructurarías el fetch (tenés 2 endpoints)
cómo evitarías hacer demasiadas requests
cómo manejarías loading + errores
cómo implementarías paginación
cómo mejorarías performance
⚠️ FOLLOW-UP (te interrumpo)

“Fetching each job individually sounds expensive… how would you optimize that?”

⚠️ FOLLOW-UP 2

“What happens if some requests fail?”

---------------------------------------------

💯 Versión ideal (nivel top candidate)

I would separate the logic into two parts.

First, I fetch all job IDs once and store them in a ref.

Then, I fetch job details in chunks based on pagination.

To avoid overfetching, I only request the IDs needed for the current page using slice.

I use Promise.allSettled to handle partial failures gracefully.

To prevent race conditions, I use an AbortController and a loading ref to block concurrent requests.

I append new jobs to the existing state instead of replacing them.

For performance, I avoid unnecessary re-renders using refs and controlled state updates.

I would also improve UX by disabling the load button while loading and handling errors properly.