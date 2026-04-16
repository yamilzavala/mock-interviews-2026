🚀 PARTE 2 — Algoritmo (nivel tricky)

Este ya es un poco más complejo.

🧩 Enunciado

Dado un array de números:

[1,2,1,2,3]

Y un número k:

2

👉 encontrar la longitud del subarray más largo que contenga como máximo k elementos distintos.

Ejemplo
Input: nums = [1,2,1,2,3], k = 2
Output: 4  // [1,2,1,2]
🎤 Pregunta 2

👉 explicame:

qué patrón usarías
qué estructura usarías
cómo manejarías la condición
complejidad esperada

------------------------------

I would use a sliding window approach with a frequency map to track the count of each element.

I expand the window by moving the right pointer and updating the frequency map.

If the number of distinct elements exceeds k, I shrink the window from the left, decrementing the frequency and removing elements from the map when their count reaches zero.

At each step where the window is valid, I update the maximum length.

This runs in O(n) time and uses O(k) space.