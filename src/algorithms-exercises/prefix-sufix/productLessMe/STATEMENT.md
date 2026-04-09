🧩 Enunciado

Dado un array de números:

[4, 2, 1, 6]

👉 devolver el array transformado donde:

cada elemento es el producto de todos los demás elementos
Output esperado
[12, 24, 48, 8]
⚠️ Condición importante

👉 NO podés usar división

🎤 Pregunta 2

👉 explicame:

cómo lo resolverías
qué patrón usarías
complejidad

---------------------------

💯 Versión ideal (nivel top)

I would solve this using a prefix and suffix approach.

First, I create a result array initialized with 1s.

In the first pass, I store the prefix product for each index.

In the second pass, I multiply each position by the suffix product.

This way, each element contains the product of all elements except itself.

This runs in O(n) time and uses O(1) extra space.