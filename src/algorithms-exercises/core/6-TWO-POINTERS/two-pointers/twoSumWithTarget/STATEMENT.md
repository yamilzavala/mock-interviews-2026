🚀 PARTE 2 — Algoritmo (muy típico NZ)

Este es MUY común en entrevistas frontend.

🧩 Enunciado

Dado un array de números:

[1,3,5,7,9,11]

👉 y un número target:

8

👉 encontrar dos números cuya suma sea la más cercana al target.

Output esperado
7 + 1 = 8 → exacto

o si no es exacto:

closest possible
🎤 Pregunta 2

👉 explicame:

qué patrón usarías
cómo lo resolverías
complejidad esperada

-----------------------------------------------------------

🧠 Te hago un mini ajuste de senior (detalle fino)
Antes de darte el código, fijate esto:

👉 Orden de las cosas dentro del loop:
Calculás sum
Calculás diff
Actualizás resultado (SI corresponde)
Evaluás si terminás (sum === target)
Movés punteros


💯 Versión ideal (nivel top)
I would use a two-pointer approach since the array is sorted.
I initialize left at 0 and right at the end of the array.
At each step, I compute the sum of nums[left] and nums[right] and calculate the difference from the target.
If the difference is smaller than the current closest difference, I update the result.
If the sum is less than the target, I move the left pointer to increase the sum. If it's greater, I move the right pointer to decrease it.
If I find an exact match, I can return immediately.
This runs in O(n) time and O(1) space.