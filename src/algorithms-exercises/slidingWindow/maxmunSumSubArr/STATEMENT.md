🧪 Enunciado

Given an array of integers and a number k, find the maximum sum of any contiguous subarray of size k.

📌 Ejemplo
Input: arr = [2, 1, 5, 1, 3, 2], k = 3  
Output: 9

Explanation:

[2,1,5] → 8  
[1,5,1] → 7  
[5,1,3] → 9  ← máximo  
[1,3,2] → 6  
🎯 Qué buscan evaluar
Identificar que es ventana fija (fixed-size sliding window)
Evitar solución O(n²)
Usar optimización O(n)


--------------------------------------------------------------

Perfecto, esto se entiende cuando lo ves con punteros, no con la fórmula sola. Vamos paso a paso 👇

🧠 Ejemplo
arr = [2, 1, 5, 1, 3, 2]
k = 3
🔹 Ventana inicial
left=0        right=2
[ 2 , 1 , 5 ] → suma = 8

👉 windowSum = 8

🔄 Movimiento de la ventana

Ahora avanzamos 1 posición:

left=1        right=3
[ 1 , 5 , 1 ]
🔥 ¿Qué pasó?
❌ sale el 2 (arr[0])
✅ entra el 1 (arr[3])
⚙️ La fórmula
windowSum = windowSum - arr[i - k] + arr[i]

👉 En este caso:

i = 3

windowSum = 8 - arr[3 - 3] + arr[3]
windowSum = 8 - arr[0] + arr[3]
windowSum = 8 - 2 + 1 = 7
🔍 Visual claro
ANTES:
[ 2 , 1 , 5 ] → 8

DESPUÉS:
  [ 1 , 5 , 1 ] → ?

Operación:
8 - 2 + 1 = 7
🔁 Siguiente movimiento
left=2        right=4
[ 5 , 1 , 3 ]

👉 Sale 1, entra 3

windowSum = 7 - 1 + 3 = 9
🧠 Cómo pensarlo fácil

👉 En cada paso:

saco el de la izquierda
agrego el nuevo de la derecha
🎯 Regla mental (clave)

“lo que sale es arr[i - k], lo que entra es arr[i]”

🧩 Por qué i - k

Porque:

i = índice del nuevo elemento que entra
k = tamaño de la ventana

👉 entonces:

i - k = índice del elemento que queda afuera
🎤 Cómo lo explicás en entrevista

“When I move the window, I remove the element that falls out (i - k) and add the new one (i), so I don’t need to recalculate the sum.”