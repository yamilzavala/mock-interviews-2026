🧩 Enunciado

Dado un array de números:

[2, 3, 1, 2, 4, 3]

Y un número target:

7

👉 encontrar la longitud del subarray más corto cuya suma sea ≥ target.

Ejemplo
Input: nums = [2,3,1,2,4,3], target = 7
Output: 2  // [4,3]
🎤 Pregunta 2

Antes de codear:

👉 explicame:

qué patrón usarías
cómo lo resolverías
complejidad esperada


-----------------------
💯 Respuesta ideal (nivel entrevista fuerte)

I would use a sliding window approach.

I expand the window by moving the right pointer and keep a running sum.

Once the sum is greater than or equal to the target, I shrink the window from the left to find the smallest valid window.

During this process, I track the minimum window size.

This solution runs in O(n) time since each element is visited at most twice, and uses O(1) extra space.

---------------------

"I'm expanding the window by adding nums[right]..."

"When the sum reaches or exceeds the target, I shrink from the left..."

"I'm updating the minimum length each time the condition is satisfied..."