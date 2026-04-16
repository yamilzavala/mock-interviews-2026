🧪 PARTE 2 — Algoritmo (filtro técnico)
🧩 Enunciado

Dado un string s, encontrar la longitud del substring más largo sin caracteres repetidos.

Ejemplo:

Input: "abcabcbb"
Output: 3  // "abc"
🎤 Lo que quiero ver

Antes de codear:

❓ Pregunta 2
cómo lo resolverías
qué estructura usarías
complejidad esperada

----------------------------------------------------------------------------------------------

sliding window

🧠 Cómo detectar Sliding Window
🔥 1. Te hablan de substrings / subarrays

👉 Palabras clave:

“substring”
“subarray”
“contiguous”

📌 Ejemplo:

“longest substring…” → 🚨 sliding window

🔥 2. Buscan algo continuo dentro de una lista/string

👉 No es cualquier combinación → es segmento consecutivo

"abc" dentro de "abcabc" → sí
"ac" → ❌ no es continuo
🔥 3. Te piden máximo / mínimo / longitud

👉 Clásicos:

longest
shortest
maximum
minimum

📌 Ejemplo:

“longest substring without repeating characters” → sliding window

🔥 4. Hay una condición dinámica

👉 Algo que se rompe y se repara:

sin repetidos
suma ≤ k
máximo k elementos distintos

📌 Ejemplo:

“at most k distinct characters”

🔥 5. Estás pensando en O(n²)… y no te gusta 😄

👉 Si tu primera idea es:

for (...) {
  for (...) {
    // substring
  }
}

🚨 Probablemente hay sliding window en O(n)

🔥 6. Podés “expandir” y “contraer” una ventana

👉 Patrón mental:

agrando (right++)
si rompe condición → achico (left++)
🧠 Regla de oro

Si el problema trata sobre un segmento continuo y podés mover límites dinámicamente → sliding window

⚡ Checklist rápido (modo entrevista)

Si ves esto:

substring / subarray ✅
contiguous ✅
longest / shortest ✅
condición (sin repetidos, suma, etc) ✅

👉 Sliding Window casi seguro

🚫 Cuándo NO usarlo
combinaciones (no importa el orden)
subsets
permutaciones
árboles / grafos
🎤 Frase que suma puntos

“This looks like a sliding window problem because we are dealing with a contiguous substring and trying to optimize its length under a constraint.”