🧩 Enunciado — Two Pointers (Closest Sum)

👉 Dado un array de números enteros y un número target:
nums = [1, 3, 5, 7, 9]
target = 8
🎯 Objetivo

👉 Encontrar dos números distintos cuya suma sea lo más cercana posible al target

📌 Output esperado
Si existe suma exacta → devolver esa pareja
Si no → devolver la pareja cuya suma sea la más cercana
✅ Ejemplo 1
Input:
nums = [1, 3, 5, 7, 9]
target = 8

Output:
[1, 7] // suma = 8 (exacta)
✅ Ejemplo 2
Input:
nums = [1, 4, 6, 10]
target = 8

Output:
[1, 6] // suma = 7 (la más cercana)

⚠️ Condiciones importantes
El array puede venir ordenado o no
Debés optimizar a O(n log n) o mejor
No usar doble loop O(n²)

🧠 Lo que buscan evaluar
Identificar patrón Two Pointers
Uso correcto de ordenamiento (si hace falta)
Comparación contra target
Cómo mover left / right inteligentemente

💡 Hint (nivel entrevista)
👉 Si el array no está ordenado:
lo ordenás
usás:
left = 0
right = n - 1