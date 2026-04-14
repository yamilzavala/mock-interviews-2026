🧩 Enunciado
👉 Merge Intervals (UI scheduling scenario)

Tenés:
[
  [1,3],
  [2,6],
  [8,10],
  [15,18]
]

👉 devolver:
[
  [1,6],
  [8,10],
  [15,18]
]
🎯 Contexto real
👉 esto aparece en:
calendars
bookings
timelines
🎤 Pregunta

👉 explicame:
cómo lo resolverías
qué patrón usarías
complejidad

⚠️ FOLLOW-UP
“What if intervals are NOT sorted?”

-------------------------------------------------------------------

🧠 Cómo lo dirías en una entrevista (clave)
Algo así, claro y directo:

I would solve this using a greedy approach.
First, I sort the intervals by their start time.
Then, I iterate through the intervals, keeping track of a current interval.
If the next interval overlaps, I merge them by updating the end using Math.max.
If not, I push the current interval to the result and move to the next one.
At the end, I push the last interval.
The time complexity is O(n log n) due to sorting.