🧪 PARTE 2 — Algoritmo (Sliding Window)
🧩 Enunciado

Dado un array de números positivos y un número k:

👉 encontrar el máximo promedio de cualquier subarray de tamaño k.

Ejemplo
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75

Explicación:

[12, -5, -6, 50] → suma = 51 → promedio = 12.75
🎤 Pregunta

Antes de codear:

👉 explicame:

qué tipo de sliding window es (fixed o variable)
cómo lo resolverías paso a paso
complejidad esperada

💡 Tip importante:

Este es otro tipo de sliding window (no el de Set ni el de expand/contract con condición dinámica).

-----------------------------------------------------------

🧠 6. Cómo lo pensarías en una entrevista

Podés decir algo así:

First, I compute the sum of the first k elements.

Then, I slide the window one element at a time:

subtract the element leaving the window
add the new element entering

This allows me to update the sum in constant time instead of recomputing it.