🧩 Enunciado

Dado un array:

[1, 2, 3, 4]

👉 devolver todas las combinaciones posibles (subsets)

Output
[
  [],
  [1],
  [2],
  [1,2],
  [3],
  ...
]
🎤 Pregunta 2

👉 explicame:

cómo lo resolverías
qué patrón usarías
complejidad
⚠️ FOLLOW-UP (te interrumpo)

“Can you do it iteratively instead of recursion?”

-------------------------------------------

resultado = resultado + (resultado + nuevo_elemento)

💯 Respuesta ideal (nivel top)
(VERSION 1)
“I’d use an iterative approach where I start with an empty subset and, for each number, I duplicate existing subsets and append the number. This avoids recursion and keeps it simple

(VERSION 2)
I would solve this using an iterative approach to generate the power set.
I start with a result array containing an empty subset.
For each number in the input array, I iterate over the current subsets and create new subsets by adding the current number.
At each step, the number of subsets doubles.
This avoids recursion and builds all combinations iteratively.
The time complexity is O(n * 2^n) and space complexity is O(2^n).