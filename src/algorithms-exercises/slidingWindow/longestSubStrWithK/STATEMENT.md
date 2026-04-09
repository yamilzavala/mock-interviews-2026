🧪 PARTE 2 — Algoritmo (nuevo, nivel alto)
🧩 Enunciado

Dado un string:

"eceba"

Y un número k:

2

👉 encontrar la longitud del substring más largo que contenga exactamente k caracteres distintos.

Ejemplo
Input: s = "eceba", k = 2
Output: 3 → "ece"
⚠️ IMPORTANTE

👉 Este es distinto al anterior:

Antes era:

"como máximo k"

Ahora es:

"exactamente k"
🎤 Pregunta

👉 explicame:

qué patrón usarías
qué estructura usarías
cómo manejarías la condición
qué cambia respecto al problema anterior
complejidad

------------------------------------------------------------

💯 Respuesta ideal (nivel top)

I would use a sliding window approach with a frequency map.
I expand the window by moving the right pointer and updating the map.
If the number of distinct characters exceeds k, I shrink the window from the left until it becomes valid again.
I only update the result when the number of distinct characters is exactly k.
This runs in O(n) time and uses O(k) space.
